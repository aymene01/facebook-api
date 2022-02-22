import { Body, Controller, Get, Param, UseGuards, Patch } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { UsersService } from '../services/users.service';

@UseGuards(JwtAuthGuard)
@Controller('/users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id/profile')
  findProfile(@Param('id') id: string) {
    return this.usersService.getProfile(id);
  }

  @Get(':id/posts')
  findPosts(@Param('id') id: string) {
    return this.usersService.getPosts(id);
  }

  @Patch(':id/profile')
  updateProfile(@Param('id') id: string, @Body() data: UpdateProfileDto) {
    return this.usersService.updateProfile(id, data);
  }
}
