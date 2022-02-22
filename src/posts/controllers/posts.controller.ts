import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Body,
  Patch,
  Delete,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { PostsService } from '../services/posts.service';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get(':id')
  findPostById(@Param('id') id: string) {
    return this.postsService.getPostById(parseInt(id, 10));
  }

  @Post()
  createPost(@Req() req: any, @Body() message: CreatePostDto) {
    return this.postsService.createPost(message, req.user.id);
  }

  @Get()
  findAllPost() {
    return this.postsService.getAllPost();
  }

  @Patch(':id')
  updatePostById(@Param('id') id: string, @Body() data: UpdatePostDto) {
    return this.postsService.updatePostById(parseInt(id, 10), data);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePostById(parseInt(id, 10));
  }
}
