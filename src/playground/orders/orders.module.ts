import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { IdempotencyService } from '../../common/idempotency/idempotency.service';
import { RedisModule } from '../infrastructure/redis.module';
import { CacheModule } from '../../common/cache/cache.module';
import { CacheService } from '../../common/cache/cache.service';
import { OrdersService } from './orders.service';

@Module({
  imports: [RedisModule, CacheModule],
  controllers: [OrdersController],
  providers: [IdempotencyService, OrdersService],
})
export class OrdersModule {}
