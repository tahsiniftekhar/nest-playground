import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RedisModule } from '../infrastructure/redis.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'access-token-secret',
      signOptions: { expiresIn: '15m' },
    }),
    RedisModule
  ],
  controllers: [AuthController],
  providers: [AuthService, ],
})
export class AuthModule {}
