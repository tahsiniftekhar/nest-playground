import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RateLimitGuard } from './guards/rate-limit.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(RateLimitGuard)
  @Post('login')
  login(@Body() body: any) {
    const user = this.authService.validateUser(body.username, body.password);

    return this.authService.login(user);
  }

  @Post('refresh')
  refresh(@Body() body: any) {
    return this.authService.refresh(body.refreshToken);
  }

  @Post('logout')
  logout(@Body() body: any) {
    return this.authService.logout(body.userId);
  }

  @UseGuards(JwtAuthGuard, RateLimitGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return {
      message: 'Protected profile',
      user: req.user,
    };
  }
}
