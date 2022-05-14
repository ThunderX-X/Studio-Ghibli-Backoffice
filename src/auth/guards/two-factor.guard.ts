import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class TwoFactorGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const access_token = request.headers.authorization;
    const payload: any = this.jwtService.decode(access_token);
    this.hasPayload(payload);
    this.twoFactorEnabled(payload);
    return true;
  }

  private hasPayload(payload) {
    if (!payload) throw new ForbiddenException('Not authenticated');
  }

  private twoFactorEnabled(payload) {
    if (payload.twoFactor && !payload.twoFactorAuth)
      throw new ForbiddenException('Not Two factor logged');
  }
}
