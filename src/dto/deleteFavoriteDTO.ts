import { IsMongoId } from 'class-validator';

export class deleteFavoriteDTO {
  @IsMongoId()
  id: string;
}
