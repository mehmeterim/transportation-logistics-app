import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favorite } from 'src/schemas/favorite.schema';
import { Transporter } from 'src/schemas/transporter.schema';
import { TransportersService } from '../transporters/transporters.service';
import { PromotionsService } from '../promotions/promotions.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite.name) private favoriteModel: Model<Favorite>,
    private readonly transporterService: TransportersService,
    private readonly promotionService: PromotionsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async userFavorites(userId: string): Promise<Favorite[]> {
    const cacheResult: string = await this.cacheManager.get(
      `user:${userId}:favorites`,
    );

    if (cacheResult === undefined) {
      const result = await this.favoriteModel
        .find({ userId: userId })
        .populate('transporter')
        .populate('promotions')
        .lean();

      await this.cacheManager.set(
        `user:${userId}:favorites`,
        JSON.stringify(result),
      );

      return result;
    }

    return JSON.parse(cacheResult) as Favorite[];
  }

  async createFavorite(
    userId: string,
    transporterId: string,
  ): Promise<Favorite> {
    const query: any = {
      userId: userId,
      transporterId: transporterId,
    };
    const count: number = await this.favoriteModel.countDocuments(query);
    if (count > 0) {
      throw new ConflictException(`Already exist!`);
    }

    const checkTransporter: Transporter =
      await this.transporterService.findById(transporterId);

    if (checkTransporter === null) {
      throw new NotFoundException(`Transporter not found`);
    }

    await this.promotionService.addPromotionToUser(
      userId,
      transporterId,
      10,
      new Date(),
      new Date(),
    );

    await this.cacheManager.del(`user:${userId}:favorites`);

    return this.favoriteModel.create({
      userId: userId,
      transporterId: transporterId,
    });
  }

  async deleteFavorite(id: string, userId: string): Promise<boolean> {
    const result = await this.favoriteModel.deleteOne({
      _id: id,
      userId: userId,
    });

    await this.cacheManager.del(`user:${userId}:favorites`);

    return result.deletedCount > 0;
  }
}
