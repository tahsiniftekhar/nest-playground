import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpStatusModule } from './playground/http-status/http-status.module';
import { MiddlewareModule } from './playground/middleware/middleware.module';
import { PipesModule } from './playground/pipes/pipes.module';

@Module({
  imports: [HttpStatusModule, MiddlewareModule, PipesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
