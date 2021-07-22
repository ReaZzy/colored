import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CommentsService } from './comments.service';
import { Comments } from './comments.entity';
import { CommentsDataDto } from './dto/comments-data.dto';
import { PostIdDto } from '../posts/dto/post-id.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('posts/:id/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getAll(): Promise<Comments[]> {
    return this.commentsService.getAll();
  }

  @Post()
  async create(
    @Param() postId: PostIdDto,
    @Body() commentsData: CommentsDataDto,
    @Req() req: Request,
  ): Promise<Comments> {
    commentsData.postId = postId.id;
    commentsData.userId = req.user.id;
    return this.commentsService.create(commentsData);
  }
}
