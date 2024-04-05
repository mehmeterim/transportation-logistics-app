import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favorite } from 'src/schemas/favorite.schema';
import { Transporter } from 'src/schemas/transporter.schema';
import { TransportersService } from '../transporters/transporters.service';
import { PromotionsService } from '../promotions/promotions.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite.name) private favoriteModel: Model<Favorite>,
    private readonly transporterService: TransportersService,
    private readonly promotionService: PromotionsService,
  ) {}

  async userFavorites(userId: string): Promise<Favorite[]> {
    return this.favoriteModel.find({ userId: userId });
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

    return result.deletedCount > 0;
  }
}
