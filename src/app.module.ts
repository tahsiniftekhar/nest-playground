import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpStatusModule } from './playground/http-status/http-status.module';

@Module({
  imports: [HttpStatusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
