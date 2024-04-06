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
import { ObjectId } from 'mongoose';
import { deleteFavoriteDTO } from 'src/dto/deleteFavoriteDTO';
import { responseDTO } from 'src/dto/responseDTO';

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
  async addFavorite(
    @Request() req,
    @Body()
    addFavoriteDTO: addFavoriteDTO,
  ): Promise<responseDTO> {
    const { id } = req.user;

    const data = await this.favoriteService.createFavorite(
      id,
      addFavoriteDTO.transporterId,
    );

    return {
      status: true,
      data: data,
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteFavorite(
    @Request() req,
    @Param() params: deleteFavoriteDTO,
  ): Promise<responseDTO> {
    const user = req.user;

    const result = await this.favoriteService.deleteFavorite(
      params.id,
      user.id,
    );

    return {
      status: result,
      data: undefined,
    };
  }
}
