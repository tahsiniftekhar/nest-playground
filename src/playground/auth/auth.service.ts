import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  validateUser(username: string, password: string) {
    if (username === 'admin' && password === 'password') {
      return { userId: 1, username: 'admin', role: 'admin' };
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  login(user: any) {
    const payload = {
      sub: user.userId,
      username: user.username,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
