import { Module } from '@nestjs/common';
import { HttpStatusController } from './http-status.controller';

@Module({
  controllers: [HttpStatusController],
})
export class HttpStatusModule {}
