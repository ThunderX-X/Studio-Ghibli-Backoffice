import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../services/auth.service';
import { TwoFactorAuthService } from '../../multi-factor-auth/services/two-factor-auth.service';
import config from '../../config';
import { ConfigType } from '@nestjs/config';
import { Payload } from '../models/payload.model';
import { PermissionsService } from '../services/permissions.service';
import { UsersService } from 'src/users/services/users.service';
import { CreateUser } from 'src/users/dtos/user.dto';
@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'Facebook') {
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
      clientID: configService.facebookAuth.clientID,
      clientSecret: configService.facebookAuth.clientSecret,
      callbackURL: configService.facebookAuth.callbackURL,
      profileFields: ['name', 'picture', 'emails'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ) {
    const { name, emails, id, photos } = profile;
    const userDto = this.createUserDto({
      email: emails?.length > 0 ? emails[0].value : '',
      facebookId: id,
      firstName: name.givenName,
      lastName: name.familyName,
      profilePicture: photos?.length > 0 ? photos[0].value : '',
    });
    let bdUser = await this.usersService.findByConditions({
      facebookId: userDto.facebookId,
    });
    if (!bdUser) bdUser = await this.usersService.create(userDto);

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
    facebookId,
  }) {
    const userDto = new CreateUser();
    userDto.active = true;
    userDto.email = email;
    userDto.firstName = firstName;
    userDto.lastName = lastName;
    userDto.password = null;
    userDto.roleId = null;
    userDto.profilePicture = profilePicture;
    userDto.facebookId = facebookId;

    return userDto;
  }
}
