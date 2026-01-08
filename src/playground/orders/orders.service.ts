import { Injectable } from '@nestjs/common';
import { CacheService } from '../../common/cache/cache.service';

@Injectable()
export class OrdersService {
  constructor(private cache: CacheService) {}

  async findOrder(orderId: string) {
    const cacheKey = `orderId:${orderId}`;

    const cached = await this.cache.get(cacheKey);

    if (cached) {
      console.log('[Orders Service] cached', cached);
      return cached;
    }

    const order = {
      id: orderId,
      status: 'CREATED',
    };

    const result = await this.cache.set(cacheKey, order, 120);

    console.log('[Orders Service] db', result);

    return order;
  }
}
