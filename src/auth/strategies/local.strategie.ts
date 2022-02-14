import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }
  validate = async (usernameField: string, passwordField: string) => {
    const user = await this.authService.validateUser(
      usernameField,
      passwordField,
    );

    if (!user) throw new UnauthorizedException();
    return user;
  };
}