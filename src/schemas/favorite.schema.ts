import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type FavoriteDocument = HydratedDocument<Favorite>;

@Schema({ toJSON: { virtuals: true } })
export class Favorite {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true })
  userId: ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transporter',
    index: true,
  })
  transporterId: ObjectId;
}

const FavoriteSchema = SchemaFactory.createForClass(Favorite);

FavoriteSchema.virtual('transporter', {
  ref: 'Transporter',
  localField: 'transporterId',
  foreignField: '_id',
  justOne: true,
});

FavoriteSchema.virtual('promotions', {
  ref: 'Promotion',
  localField: 'userId',
  foreignField: 'userId',
  justOne: false,
});

export { FavoriteSchema };
