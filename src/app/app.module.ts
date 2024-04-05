import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MONGODB_CONNECTION_URL } from 'src/config/configuration';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { TransportersModule } from './modules/transporters/transporters.module';
import { PromotionsModule } from './modules/promotions/promotions.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongooseModule.forRoot(MONGODB_CONNECTION_URL),
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 60,
      },
    ]),
    CacheModule.register({ isGlobal: true }),
    UsersModule,
    FavoritesModule,
    TransportersModule,
    PromotionsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
