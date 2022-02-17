import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from 'src/database/services/prisma.service';
import { CreatePostDto } from '../dtos/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  getPostById = (id: number): Promise<Post> =>
    this.prisma.post.findUnique({ where: { id } });

  // createPost = (id, message: CreatePostDto) =>
  //   this.prisma.post.create({ data: { message }, select: { authorId: id } });

  getAllPost = (): Promise<Post[]> => this.prisma.post.findMany();

  updatePostById = (id, data): Promise<Post> =>
    this.prisma.post.update({ where: { id }, data });

  deletePostById = (id): Promise<Post> =>
    this.prisma.post.delete({ where: { id } });
}
