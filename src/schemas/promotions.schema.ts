import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PromotionDocument = HydratedDocument<Promotion>;

@Schema()
export class Promotion {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Transporter' })
  transporterId: string;

  @Prop()
  name: string;

  @Prop()
  discountRate: number;

  @Prop()
  startAt: Date;

  @Prop()
  endAt: Date;
}

export const PromotionSchema = SchemaFactory.createForClass(Promotion);
