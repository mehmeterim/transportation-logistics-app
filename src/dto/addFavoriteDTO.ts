import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class addFavoriteDTO {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  transporterId: string;
}
