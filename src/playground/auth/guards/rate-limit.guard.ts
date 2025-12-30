import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject
} from '@nestjs/common';
import { Request } from 'express';
import Redis from 'ioredis';
import { TooManyRequestsException } from '../../../common/exceptions/too-many-requests.exception';

@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(@Inject('REDIS') private redis: Redis) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const key = `rate:${request.ip}`;
    const limit = 5;
    const windowSeconds = 60;

    const current = await this.redis.incr(key);

    console.log('[RateLimitGuard] current', current);

    if (current === 1) {
      await this.redis.expire(key, windowSeconds);
    }

    if (current > limit) {
      throw new TooManyRequestsException('Rate limit exceeded');
    }

    return true;
  }
}
