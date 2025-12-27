import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest<Request>();

    console.log(`[Interceptor] Incoming ${request.method} ${request.url}`);

    return next.handle().pipe(
      tap(() => {
        console.log(`[Interceptor] Completed in ${Date.now() - now}ms`);
      }),
    );
  }
}
