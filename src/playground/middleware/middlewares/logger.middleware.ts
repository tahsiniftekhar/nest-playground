import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`[Middleware] ${req.method} ${req.originalUrl}`);
    console.log(`[Request route] ${req.route}`);
    res.on('finish', () => {
      console.log(`[Middleware] Response sent with status ${res.statusCode}`);
    });
    next();
  }
}
