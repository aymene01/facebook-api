import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { hash, compare } from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  validateUser = async (
    email: string,
    password: string,
  ): Promise<User | null> => {
    const user = await this.userService.findUnique(email);

    if (user && (await this.checkPassword(password, user.password)))
      return user;

    return null;
  };

  checkPassword = async (
    passwordInput: string,
    passwordInDb: string,
  ): Promise<boolean> => await compare(passwordInput, passwordInDb);

  hashPassword = async (password: string): Promise<string> =>
    await hash(password, 10);

  login = async (user: LoginDto) => {
    const { email } = user;
    const payload = { email };
    return {
      user,
      accesToken: this.jwtService.sign(payload),
    };
  };

  register = async ({ email, password }: RegisterDto) =>
    this.userService.create({
      email,
      // password encryption for security
      password: await this.hashPassword(password),
    });
}
