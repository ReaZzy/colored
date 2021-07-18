import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { PostsService } from './posts.service';
import Posts from './posts.entity';
import { PostDataDto } from './dto/post-data.dto';
import { PostIdDto } from './dto/post-id.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Users } from '../users/users.entity';

@UseGuards(JwtAuthGuard)
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
  async like(@Param() postId: PostIdDto, @Req() req: Request): Promise<Posts> {
    return this.postsService.like(postId, req.user as Users);
  }

  @Delete('like/:id')
  async unLike(
    @Param() postId: PostIdDto,
    @Req() req: Request,
  ): Promise<Posts> {
    return this.postsService.unLike(postId, req.user as Users);
  }
}
