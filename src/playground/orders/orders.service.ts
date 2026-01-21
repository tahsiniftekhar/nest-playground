import { CacheService } from '@/common/cache/cache.service';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { Injectable, Logger, BadRequestException } from '@nestjs/common';

@Injectable()
export class OrdersService {
  constructor(
    private cache: CacheService,
    private prisma: PrismaService,
  ) {}
  private readonly logger = new Logger(OrdersService.name);

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

  async createOrder(productId: number, quantity: number) {
    const tId = Math.random().toString(36).substring(7).toUpperCase();
    this.logger.log(
      `[TX-${tId}] Starting Order Process for Product: ${productId}`,
    );

    try {
      this.logger.log(
        `[TX-${tId}] Step 1: Attempting to deduct ${quantity} from inventory...`,
      );
      return this.prisma.$transaction(async (tx) => {
        const result = await tx.inventory.updateMany({
          where: {
            productId,
            stock: { gte: quantity },
          },
          data: {
            stock: { decrement: quantity },
          },
        });

        if (result.count === 0) {
          this.logger.error(
            `[TX-${tId}] Step 1 Failed: Insufficient stock or Product not found.`,
          );
          throw new BadRequestException('Insufficient stock!');
        }

        this.logger.log(`[TX-${tId}] Step 1 Success: Inventory deducted.`);
        this.logger.log(`[TX-${tId}] Step 2: Creating order record...`);

        const order = await tx.order.create({
          data: { productId, quantity },
        });

        this.logger.log(
          `[TX-${tId}] Step 2 Success: Order created with ID: ${order.id}`,
        );

        this.logger.log(`[TX-${tId}] TRANSACTION COMMITTING...`);
        return { success: true, orderId: order.id };
      });
    } catch (error) {
      this.logger.error(
        `[TX-${tId}] TRANSACTION ROLLED BACK: ${error.message}`,
      );
      throw error;
    }
  }
}
