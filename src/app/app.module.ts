import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MONGODB_CONNECTION_URL } from 'src/config/configuration';
import { FavoritesModule } from './modules/favorites/favorites.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(MONGODB_CONNECTION_URL),
    ConfigModule.forRoot(),
    FavoritesModule,
  ],
})
export class AppModule {}
