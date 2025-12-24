/**
 * HTTP Status Playground
 *
 * Goals:
 * - Understand proper usage of 200, 201, 204
 * - Handle 400, 401, 403, 404
 * - Learn Nest response handling vs exceptions
 */

import {
  BadRequestException,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

@Controller('http-status')
export class HttpStatusController {
  @Get('ok')
  getOk() {
    return {
      message: '200 Ok - successful GET request',
    };
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  createResource() {
    return {
      message: '201 Created - resource created',
    };
  }

  @Delete('remove')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeResource() {
    return;
  }

  @Get('bad-request')
  badRequest() {
    throw new BadRequestException('Invalid input provided');
  }

  @Get('not-found')
  notFound() {
    throw new NotFoundException('Resource not found');
  }

  @Get('unauthorized')
  unauthorized() {
    throw new UnauthorizedException('Authentication required');
  }

  @Get('forbidden')
  forbidden() {
    throw new ForbiddenException('Access denied');
  }

  @Get('manual-400')
  manualBadRequest() {
    throw new BadRequestException();
  }
}
