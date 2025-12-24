import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MiddlewareController } from './middleware.controller';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  controllers: [MiddlewareController],
})
export class MiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('middleware', 'pipes');
  }
}
