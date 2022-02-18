import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  validateUser = async (email, password): Promise<any> => {
    const user = await this.userService.findUnique(email);

    if (user && (await this.checkPassword(password, user.password)))
      return user;

    return null;
  };

  checkPassword = async (passwordInput, passwordInDb) =>
    await compare(passwordInput, passwordInDb);

  hashPassword = async (password) => await hash(password, 10);

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
