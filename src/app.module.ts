import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GuardsModule } from './playground/guards/guards.module';
import { HttpStatusModule } from './playground/http-status/http-status.module';
import { InterceptorsModule } from './playground/interceptors/interceptors.module';
import { MiddlewareModule } from './playground/middleware/middleware.module';
import { PipesModule } from './playground/pipes/pipes.module';
import { ExceptionFiltersModule } from './playground/exception-filters/exception-filters.module';

@Module({
  imports: [
    HttpStatusModule,
    MiddlewareModule,
    PipesModule,
    GuardsModule,
    InterceptorsModule,
    ExceptionFiltersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
