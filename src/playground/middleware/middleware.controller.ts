import { Controller, Get } from '@nestjs/common';

@Controller('middleware')
export class MiddlewareController {
  @Get('test')
  test() {
    return {
      message: 'Middleware test route',
    };
  }
}
