import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseEnumPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthCodeTypes } from '../../multi-factor-auth/enums/auth-codes.enum';
import { TwoFactorAuthService } from '../../multi-factor-auth/services/two-factor-auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalGuard } from '../guards/local.guard';
import { AuthService } from '../services/auth.service';

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Login } from '../models/login.model';
import { TwoFactorLogin } from '../models/two-factor-login.model';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly twoFactorAuthService: TwoFactorAuthService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('Local'))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: Login })
  @ApiOperation({
    summary: `This endpoint enables simple authentication`,
    description: `This endpoint enables simple authentication, if two factor authentication is enabled the provided token is only valid for the endpoints: 
    
    - /auth/twoFactorLogin
    - /auth/generate
    - /auth/availableTwoFactors`,
  })
  login(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(LocalGuard)
  @Get('generate/:codeType')
  @ApiBearerAuth()
  @ApiOperation({
    summary: `Generates two-factor code`,
    description: `Generates two-factor code if is required by the two-factor authentication type`,
  })
  @ApiParam({
    name: 'codeType',
    allowEmptyValue: false,
    enum: AuthCodeTypes,
    description: 'Two factor code type to generate',
  })
  generate(
    @Param('codeType', new ParseEnumPipe(AuthCodeTypes))
    codeType: string,
    @Req() request: Request,
  ) {
    const userId = this.authService.getUserId(request);
    return this.twoFactorAuthService.generate(userId, AuthCodeTypes[codeType]);
  }

  @UseGuards(LocalGuard, AuthGuard('TwoFactor'))
  @Post('twoFactorLogin')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: TwoFactorLogin })
  @ApiBearerAuth()
  @ApiOperation({
    summary: `This endpoint validate two-factor authentication when enabled and return new token`,
    description: `This endpoint enables two-factor authentication when enabled, standard authentication is required through the 'login' endpoint, the provided token is valid for all endpoints`,
  })
  twoFactorLogin(@Req() req: Request) {
    return req.user;
  }
}
