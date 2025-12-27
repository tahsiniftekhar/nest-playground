import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from './interceptors/logging.interceptors';
import { TransformInterceptor } from './interceptors/transform.inceptors';

@Controller('interceptors')
export class InterceptorsController {
  @UseInterceptors(LoggingInterceptor)
  @Get('test')
  test() {
    return { message: 'Interceptor test route' };
  }

  @UseInterceptors(TransformInterceptor)
  @Get('wrapped')
  wrapped() {
    return { message: 'Response wrapped' };
  }
}
