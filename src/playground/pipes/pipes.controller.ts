import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('pipes')
export class PipesController {
  @Post('user')
  createUser(@Body() body: CreateUserDto) {
    return {
      message: 'User created',
      data: body,
    };
  }
}
