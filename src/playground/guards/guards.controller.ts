import { Controller, Get, UseGuards } from '@nestjs/common';
import { SimpleAuthGuard } from './guards/simple-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';

@Controller('guards')
export class GuardsController {
  @Get('public')
  publicRoute() {
    return {
      message: 'Public route accessible by anyone',
    };
  }

  @UseGuards(SimpleAuthGuard)
  @Get('protected')
  protectedRoute() {
    return { message: 'Protected route accessed' };
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get('admin')
  adminRoute() {
    return { message: 'Admin access granted' };
  }
}
