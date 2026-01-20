import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(WalletService.name);

  async deduct(walletId: number, amount: number) {
    const wallet = await this.prisma.wallet.findUnique({
      where: { id: walletId },
    });

    if (!wallet) throw new Error('Wallet not found');

    if (wallet.balance < amount) {
      throw new Error('Insufficient balance');
    }

    await this.prisma.wallet.update({
      where: { id: walletId },
      data: {
        balance: wallet.balance - amount,
      },
    });

    return true;
  }

  async deductStep4(walletId: number, amount: number) {
    const requestId = Math.random().toString(36).substring(7); // To track specific requests
    this.logger.log(`[Req: ${requestId}] Transaction Started`);

    return this.prisma.$transaction(async (tx) => {
      // 1. Read
      const wallet = await tx.wallet.findUnique({ where: { id: walletId } });
      this.logger.log(`[Req: ${requestId}] Read Balance: ${wallet?.balance}`);

      // Artificial delay to make the race condition easy to see
      await new Promise((res) => setTimeout(res, 100));

      if (!wallet || wallet.balance < amount) {
        this.logger.error(`[Req: ${requestId}] Insufficient balance!`);
        throw new Error('Insufficient balance');
      }

      // 2. Write
      const updated = await tx.wallet.update({
        where: { id: walletId },
        data: { balance: wallet.balance - amount },
      });

      this.logger.log(
        `[Req: ${requestId}] Write Complete. New Balance: ${updated.balance}`,
      );
      return updated;
    });
  }

  async deductStep5(walletId: number, amount: number) {
    const requestId = Math.random().toString(36).substring(7);
    this.logger.log(`[Req: ${requestId}] Atomic Update Started`);

    const result = await this.prisma.wallet.updateMany({
      where: {
        id: walletId,
        balance: { gte: amount },
      },
      data: {
        balance: { decrement: amount },
      },
    });

    if (result.count === 0) {
      this.logger.error(
        `[Req: ${requestId}] Failed: Condition not met (Insufficient balance)`,
      );
      throw new Error('Insufficient balance or concurrent update');
    }

    // Optional: Read only to show the user the final result
    const finalWallet = await this.prisma.wallet.findUnique({
      where: { id: walletId },
    });
    this.logger.log(
      `[Req: ${requestId}] Success! Final Balance: ${finalWallet?.balance}`,
    );

    return finalWallet;
  }
}
