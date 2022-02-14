import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { RegisterDto } from '../dtos/register.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Req() req): any {
    return req.user;
  }

  @Post('/register')
  register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }
}
