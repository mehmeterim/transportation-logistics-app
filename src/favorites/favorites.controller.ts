import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Favorite } from 'schemas/favorite.schema';
import { AuthGuard } from 'guard/auth.guard';

@Controller('favorites')
export class FavoritesController {
  constructor(private favoriteService: FavoritesService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  userFavorites(@Request() req): Promise<Favorite[]> {
    console.log(req);
    return this.favoriteService.userFavorites('123');
  }
}
