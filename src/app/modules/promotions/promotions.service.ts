import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Promotion } from 'src/schemas/promotions.schema';

@Injectable()
export class PromotionsService {
  constructor(
    @InjectModel(Promotion.name) private promotionModel: Model<Promotion>,
  ) {}

  async addPromotionToUser(
    userId: string,
    transporterId: string,
    discountRate: number,
    startAt: Date,
    endDate: Date,
  ): Promise<Promotion> {
    return this.promotionModel.create({
      userId: userId,
      transporterId: transporterId,
      discountRate: discountRate,
      startAt: startAt,
      endAt: endDate,
    });
  }
}
