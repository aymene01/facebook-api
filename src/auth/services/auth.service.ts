import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  validateUser = async (email, password): Promise<any> => {
    const user = await this.userService.findUnique(email);

    if (user && password === user.password) {
      // not sending the password for security
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  };

  login = async (user: LoginDto) => {
    const { email } = user;
    const payload = { email };
    return {
      user,
      accesToken: this.jwtService.sign(payload),
    };
  };

  register = async (data: RegisterDto) => this.userService.create(data);
}
