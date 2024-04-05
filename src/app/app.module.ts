import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MONGODB_CONNECTION_URL } from 'src/config/configuration';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { TransportersModule } from './modules/transporters/transporters.module';
import { PromotionsModule } from './modules/promotions/promotions.module';

@Module({
  imports: [
    MongooseModule.forRoot(MONGODB_CONNECTION_URL),
    ConfigModule.forRoot(),
    UsersModule,
    FavoritesModule,
    TransportersModule,
    PromotionsModule,
  ],
})
export class AppModule {}
