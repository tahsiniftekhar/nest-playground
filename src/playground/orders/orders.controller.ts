import { Controller, UseInterceptors, Post } from '@nestjs/common';
import { IdempotencyInterceptor } from '../../common/idempotency/idempotency.interceptor';

@Controller('orders')
export class OrdersController {
  @UseInterceptors(IdempotencyInterceptor)
  @Post()
  createOrder() {
    return { orderId: Date.now() };
  }
}
