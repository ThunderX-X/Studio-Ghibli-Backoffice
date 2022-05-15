import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TwoFactorGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const payload = this.authService.getUserPayload(request);
    this.twoFactorEnabled(payload);
    return true;
  }

  private twoFactorEnabled(payload) {
    if (payload.twoFactor && !payload.twoFactorAuth)
      throw new ForbiddenException('Not Two factor logged');
  }
}
