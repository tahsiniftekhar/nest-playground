import { Body, Controller, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Post('deduct')
  deductBalance(@Body() body: any) {
    return this.walletService.deductStep5(body.walletId, body.amount);
  }
}
