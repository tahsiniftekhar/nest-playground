import {
  Controller,
  UseInterceptors,
  Post,
  Get,
  Param,
  Body,
} from '@nestjs/common';
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

  @Post('create')
  createOrderTx(@Body() body: any) {
    return this.ordersService.createOrder(body.productId, body.quantity);
  }
}
