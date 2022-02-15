import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { PostsService } from '../services/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findPostById(@Param('id') id: string) {
    return this.postsService.getPostById(parseInt(id, 10));
  }

  // @UseGuards(JwtAuthGuard)
  // @Post()
  // createPost(@Param('id') id: string, @Body() message: CreatePostDto) {
  //   return this.postsService.createPost(message, id);
  // }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllPost() {
    return this.postsService.getAllPost();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updatePostById(@Param('id') id: string, @Body() data: UpdatePostDto) {
    return this.postsService.updatePostById(parseInt(id, 10), data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePostById(parseInt(id, 10));
  }
}
