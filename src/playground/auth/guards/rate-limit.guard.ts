import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import Redis from 'ioredis';
import { TooManyRequestsException } from '../../../common/exceptions/too-many-requests.exception';

@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(@Inject('REDIS') private redis: Redis) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as any;

    const keys: string[] = [];

    if (user?.userId) {
      keys.push(`rate:user:${user.userId}`);
    }

    keys.push(`rate:ip:${request.ip}`);

    const limit = 5;
    const windowSeconds = 60;

    for (const key of keys) {
      const current = await this.redis.incr(key);

      console.log('[RateLimitGuard] current', current);

      if (current === 1) {
        await this.redis.expire(key, windowSeconds);
      }

      if (current > limit) {
        throw new TooManyRequestsException('Rate limit exceeded');
      }
    }

    return true;
  }
}
