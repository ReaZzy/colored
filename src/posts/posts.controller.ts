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

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAll(): Promise<Posts[]> {
    return this.postsService.getAll();
  }

  @Post()
  async create(
    @Body() postsData: PostDataDto,
    @Req() req: Request,
  ): Promise<Posts> {
    postsData.userId = req.user.id;
    return this.postsService.create(postsData);
  }

  @Put('like/:id')
  async like(@Param() postId: PostIdDto, @Req() req: Request): Promise<Posts> {
    return this.postsService.like(postId, req.user);
  }

  @Delete('like/:id')
  async unLike(
    @Param() postId: PostIdDto,
    @Req() req: Request,
  ): Promise<Posts> {
    return this.postsService.unLike(postId, req.user);
  }
}
