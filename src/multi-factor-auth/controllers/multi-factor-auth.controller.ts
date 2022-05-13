import { Controller, Get, Param } from '@nestjs/common';
import { EmailTwoFactorAuthenticationService } from '../services/email-two-factor-authentication.service';

@Controller('multi-factor-auth')
export class MultiFactorAuthController {
  constructor(
    private readonly emailService: EmailTwoFactorAuthenticationService,
  ) {}

  @Get('generate')
  generate() {
    return this.emailService.generate(1);
  }

  @Get('validate/:code')
  validate(@Param('code') code: string) {
    return this.emailService.validate(1, { code });
  }
}
