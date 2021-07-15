import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import Posts from './posts.entity';
import { PostDataDto } from './dto/post-data.dto';
import { PostIdDto } from './dto/post-id.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAll(): Promise<Posts[]> {
    return this.postsService.getAll();
  }

  @Post()
  async create(@Body() postsData: PostDataDto): Promise<Posts> {
    return this.postsService.create(postsData);
  }

  @Put('like/:id')
  async like(@Param() postId: PostIdDto): Promise<Posts> {
    return this.postsService.like(postId);
  }

  @Delete('like/:id')
  async unLike(@Param() postId: PostIdDto): Promise<Posts> {
    return this.postsService.unLike(postId);
  }
}
