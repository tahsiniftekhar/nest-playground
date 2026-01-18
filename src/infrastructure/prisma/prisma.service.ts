import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      adapter: new (require('@prisma/adapter-pg').PrismaPg)({
        connectionString: process.env.DATABASE_URL,
      }),
    });
  }
}
