import { Injectable } from '@nestjs/common';
import { Post, Profile, User } from '@prisma/client';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { PrismaService } from 'src/database/services/prisma.service';
import { UpdateProfileDto } from '../dto/update-profile.dto';

type UserPromise = User | undefined;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findUnique = (email: string): Promise<UserPromise> =>
    this.prisma.user.findUnique({ where: { email } });

  create = (data: RegisterDto): Promise<UserPromise> =>
    this.prisma.user.create({ data });

  getProfile = (id: string): Promise<Profile> =>
    this.prisma.profile.findUnique({ where: { userId: id } });

  getPosts = (id: string): Promise<Post[]> =>
    this.prisma.post.findMany({ where: { authorId: id } });

  updateProfile = (id: string, data: UpdateProfileDto): Promise<Profile> =>
    this.prisma.profile.update({ where: { userId: id }, data });
}
