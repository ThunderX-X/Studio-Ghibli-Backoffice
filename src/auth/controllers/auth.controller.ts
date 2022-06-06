import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseEnumPipe,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthCodeTypes } from '../../multi-factor-auth/enums/auth-codes.enum';
import { TwoFactorAuthService } from '../../multi-factor-auth/services/two-factor-auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalGuard } from '../guards/local.guard';
import { AuthService } from '../services/auth.service';

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Login } from '../models/login.model';
import { TwoFactorLogin } from '../models/two-factor-login.model';
import { ErrorResponse } from 'src/common/error-response.model';
import { LoguedModel } from '../models/logued.model';
import { GenerationStatus } from '../../multi-factor-auth/interfaces/TwoFactorAuthentication';
import { ConfigType } from '@nestjs/config';
import config from 'src/config';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly twoFactorAuthService: TwoFactorAuthService,
    private readonly authService: AuthService,
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
  ) {}

  @UseGuards(AuthGuard('Local'))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: Login })
  @ApiOkResponse({
    type: LoguedModel,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: ErrorResponse,
  })
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
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: GenerationStatus,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: ErrorResponse,
  })
  @ApiForbiddenResponse({
    description: 'Not authenticated',
    type: ErrorResponse,
  })
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
  @ApiOkResponse({
    type: LoguedModel,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: ErrorResponse,
  })
  @ApiForbiddenResponse({
    description: 'Not authenticated',
    type: ErrorResponse,
  })
  @ApiBody({ type: TwoFactorLogin })
  @ApiBearerAuth()
  @ApiOperation({
    summary: `This endpoint validate two-factor authentication when enabled and return new token`,
    description: `This endpoint enables two-factor authentication when enabled, standard authentication is required through the 'login' endpoint, the provided token is valid for all endpoints`,
  })
  twoFactorLogin(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(AuthGuard('Facebook'))
  @Get('facebook')
  @HttpCode(HttpStatus.PERMANENT_REDIRECT)
  @ApiOperation({
    summary: `This endpoint validate two-factor authentication when enabled and return new token`,
    description: `This endpoint enables two-factor authentication when enabled, standard authentication is required through the 'login' endpoint, the provided token is valid for all endpoints`,
  })
  facebookLogin(@Req() req: Request) {
    return req.user;
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('Facebook'))
  @HttpCode(HttpStatus.PERMANENT_REDIRECT)
  async facebookLoginRedirect(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const user: any = req.user;
    res.redirect(
      `${this.configService.frontendCallback}#access_token=${user.access_token}`,
    );
  }
}
