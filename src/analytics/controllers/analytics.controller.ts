import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserAnalyticsService } from '../services/user-analytics.service';

@Controller('analytics')
@ApiTags('analytics')
export class AnalyticsController {
  constructor(private readonly userAnalyticsService: UserAnalyticsService) {}

  @Get('usersPerRole')
  @UseGuards(AuthGuard('Logued'))
  @ApiBearerAuth()
  @ApiOperation({ description: 'Get te count of users per role in database' })
  usersPerRole() {
    return this.userAnalyticsService.usersPerRole();
  }
}
