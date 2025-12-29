import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  private refreshTokens = new Map<number, string>();
  private REFRESH_SECRET = 'refresh-token-secret';

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

    const accessToken = this.jwtService.sign(payload);

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.REFRESH_SECRET,
      expiresIn: '7d',
    });

    this.refreshTokens.set(user.userId, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.REFRESH_SECRET,
      });

      console.log('[refresh token] payload', payload);

      const storedToken = this.refreshTokens.get(payload.sub);

      if (storedToken !== refreshToken) {
        // BREECH DETECTED:
        // This token was either already used or is fake.
        this.refreshTokens.delete(payload.sub); // Nuclear option: Log the user out of EVERYTHING
        throw new UnauthorizedException('Refresh token inavlid');
      }

      this.refreshTokens.delete(payload.sub);

      const newPayload = {
        sub: payload.sub,
        username: payload.username,
        role: payload.role,
      };

      const newAccessToken = this.jwtService.sign(newPayload);

      const newRefreshToken = this.jwtService.sign(newPayload, {
        secret: this.REFRESH_SECRET,
        expiresIn: '7d',
      });

      this.refreshTokens.set(payload.sub, newRefreshToken);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  logout(userId: number) {
    console.log('[logout refreshTokens', this.refreshTokens);
    const wasDeleted = this.refreshTokens.delete(userId);
    if (wasDeleted) return { message: 'Logged out' };
  }
}
