import {
  BadRequestException,
  Controller,
  Get,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';

@UseFilters(HttpExceptionFilter)
@Controller('exception-filters')
export class ExceptionFiltersController {
  @Get('bad')
  badRequest() {
    throw new BadRequestException('Invalid input provided');
  }

  @Get('crash')
  crash() {
    throw new Error('Unexptected failure');
  }
}
