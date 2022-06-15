import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from '@superfaceai/passport-twitter-oauth2';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../services/auth.service';
import { TwoFactorAuthService } from '../../multi-factor-auth/services/two-factor-auth.service';
import config from '../../config';
import { ConfigType } from '@nestjs/config';
import { Payload } from '../models/payload.model';
import { PermissionsService } from '../services/permissions.service';
import { UsersService } from 'src/users/services/users.service';
import { CreateUserDto } from 'src/users/dtos/user.dto';
@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'Twitter') {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly twoFactorService: TwoFactorAuthService,
    private readonly permissionsService: PermissionsService,
    private readonly usersService: UsersService,
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
  ) {
    super({
      authorizationURL: 'https://twitter.com/i/oauth2/authorize',
      tokenURL: 'https://api.twitter.com/2/oauth2/token',
      clientID: configService.twitterAuth.clientID,
      clientSecret: configService.twitterAuth.clientSecret,
      callbackURL: configService.twitterAuth.callbackURL,
      scope: 'users.read offline.access tweet.read',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const { displayName, id, photos } = profile;
    const userDto = this.createUserDto({
      email: id,
      twitterId: id,
      firstName: displayName,
      lastName: '',
      profilePicture: photos?.length > 0 ? photos[0].value : '',
    });
    let bdUser = await this.usersService.findByConditions({
      twitterId: userDto.twitterId,
    });
    if (!bdUser) bdUser = await this.usersService.createUser(userDto)[0];
    await this.usersService.updateUser(bdUser.id, { ...userDto });

    const permissions =
      await this.permissionsService.getPermissionsAsPayloadType(bdUser.id);
    const payload: Payload = {
      sub: bdUser.id,
      twoFactor: true,
      twoFactorAuth: true,
      permissions,
    };
    const token = { access_token: this.jwtService.sign(payload) };
    return token;
  }

  private createUserDto({
    firstName,
    lastName,
    email,
    profilePicture,
    twitterId,
  }) {
    const userDto = new CreateUserDto();
    userDto.active = true;
    userDto.email = email;
    userDto.firstName = firstName;
    userDto.lastName = lastName;
    userDto.password = null;
    userDto.roleId = null;
    userDto.profilePicture = profilePicture;
    userDto.twitterId = twitterId;

    return userDto;
  }
}
