import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { PrismaService } from 'src/database/services/prisma.service';

type UserPromise = User | undefined;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findUnique = (email: string): Promise<UserPromise> =>
    this.prisma.user.findUnique({ where: { email } });

  create = (data): Promise<UserPromise> => this.prisma.user.create({ data });
}
