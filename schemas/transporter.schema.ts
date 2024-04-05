import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TransporterDocument = HydratedDocument<Transporter>;

@Schema()
export class Transporter {
  @Prop()
  fullName: string;
}

export const TransporterSchema = SchemaFactory.createForClass(Transporter);
