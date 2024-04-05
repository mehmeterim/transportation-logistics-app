import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Favorite } from 'src/schemas/favorite.schema';
import { AuthGuard } from 'src/guard/auth.guard';
import { addFavoriteDTO } from 'src/dto/addFavoriteDTO';

@Controller('favorites')
export class FavoritesController {
  constructor(private favoriteService: FavoritesService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  userFavorites(@Request() req): Promise<Favorite[]> {
    const { id } = req.user;
    return this.favoriteService.userFavorites(id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('')
  addFavorite(
    @Request() req,
    @Body()
    addFavoriteDTO: addFavoriteDTO,
  ): Promise<Favorite> {
    const { id } = req.user;
    return this.favoriteService.createFavorite(
      id,
      addFavoriteDTO.transporterId,
    );
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteFavorite(@Request() req, @Param() params: any): Promise<boolean> {
    const user = req.user;
    return this.favoriteService.deleteFavorite(params.id, user.id);
  }
}
