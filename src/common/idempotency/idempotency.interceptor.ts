import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IdempotencyService } from './idempotency.service';

@Injectable()
export class IdempotencyInterceptor implements NestInterceptor {
  constructor(private idempotencyService: IdempotencyService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();
    const key = request.headers.get('idempotency-key') as string;

    if (!key) {
      throw new BadRequestException('Idempotency-key missing');
    }

    const cached = await this.idempotencyService.get(key);
    if (cached) {
      if (cached.status === 'processing') {
        throw new BadRequestException(
          'Request is already being processed. Please wait.',
        );
      }
      return of(cached.response);
    }

    await this.idempotencyService.set(key, { status: 'processing' }, 30);

    return next.handle().pipe(
      tap({
        next: async (response) => {
          await this.idempotencyService.set(
            key,
            { status: 'completed', response },
            120,
          );
        },
        error: async () => {
          await this.idempotencyService.delete(key);
        },
      }),
    );
  }
}
