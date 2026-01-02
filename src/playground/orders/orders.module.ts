import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { IdempotencyService } from '../../common/idempotency/idempotency.service';
import { RedisModule } from '../infrastructure/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [OrdersController],
  providers: [IdempotencyService],
})
export class OrdersModule {}
