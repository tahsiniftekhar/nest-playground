import { Module } from '@nestjs/common';
import { CacheModule } from '../../common/cache/cache.module';
import { IdempotencyService } from '../../common/idempotency/idempotency.service';
import { RedisModule } from '../../infrastructure/redis.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [RedisModule, CacheModule],
  controllers: [OrdersController],
  providers: [IdempotencyService, OrdersService],
})
export class OrdersModule {}
