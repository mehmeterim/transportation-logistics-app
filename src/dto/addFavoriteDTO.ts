import { IsMongoId } from 'class-validator';

export class addFavoriteDTO {
  @IsMongoId()
  transporterId: string;
}
