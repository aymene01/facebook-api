import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { use } from 'passport';
import { PrismaService } from 'src/database/services/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  getPostById = (id: number): Promise<Post> =>
    this.prisma.post.findUnique({ where: { id } });

  // createPost = (id, message) => this.prisma.post.create();

  getAllPost = (): Promise<Post[]> => this.prisma.post.findMany();

  updatePostById = (id, data) =>
    this.prisma.post.update({ where: { id }, data });

  deletePostById = (id) => this.prisma.post.delete({ where: { id } });
}
