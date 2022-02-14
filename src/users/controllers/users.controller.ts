import { Body, Controller, Get, Param, UseGuards, Patch } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { UsersService } from '../services/users.service';

@Controller('/users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id/profile')
  findProfile(@Param('id') id: string) {
    return this.usersService.getProfile(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/posts')
  findPosts(@Param('id') id: string) {
    return this.usersService.getPosts(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/profile')
  updateProfile(@Param('id') id: string, @Body() data: UpdateProfileDto) {
    return this.usersService.updateProfile(id, data);
  }
}
