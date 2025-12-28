import { Module } from '@nestjs/common';
import { ExceptionFiltersController } from './exception-filters.controller';

@Module({
  controllers: [ExceptionFiltersController]
})
export class ExceptionFiltersModule {}
