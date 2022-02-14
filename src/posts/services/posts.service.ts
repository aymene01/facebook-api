import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/services/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  getPostById = (id: number): Promise<Post> =>
    this.prisma.post.findUnique({ where: { id } });

  createPost = (data) => this.prisma.post.create({ data });

  getAllPost = () => this.prisma.post.findMany();

  updatePostById = (id, data) =>
    this.prisma.post.update({ where: { id }, data });

  deletePostById = (id) => this.prisma.post.delete({ where: { id } });
}
