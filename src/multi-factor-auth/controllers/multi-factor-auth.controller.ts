import { Controller, Get, Inject } from '@nestjs/common';
import { EmailTwoFactorAuthenticationService } from '../services/email-two-factor-authentication/email-two-factor-authentication.service';

@Controller('multi-factor-auth')
export class MultiFactorAuthController {
  constructor(
    private readonly emailService: EmailTwoFactorAuthenticationService,
  ) {}
}
