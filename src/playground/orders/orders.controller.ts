import { Controller, UseInterceptors, Post, Get, Param } from '@nestjs/common';
import { IdempotencyInterceptor } from '../../common/idempotency/idempotency.interceptor';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @UseInterceptors(IdempotencyInterceptor)
  @Post()
  createOrder() {
    return { orderId: Date.now() };
  }

  @Get(':id')
  getOrder(@Param('id') id: string) {
    return this.ordersService.findOrder(id);
  }
}
