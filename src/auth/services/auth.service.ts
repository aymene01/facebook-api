import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/services/users.service';
import { RegisterDto } from '../dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  validateUser = async (email, password): Promise<any> => {
    const user = await this.userService.findUnique(email);

    if (user && password === user.password) {
      // not sending the password for security
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  };

  register = async (data: RegisterDto) => this.userService.create(data);
}
