import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Http2ServerRequest } from 'http2';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  validate = async ({ email }): Promise<User | UnauthorizedException> => {
    const user = await this.userService.findUnique(email);
    if (!user) return new UnauthorizedException();

    return user;
  };
}
