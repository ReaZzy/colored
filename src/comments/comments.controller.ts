import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CommentsService } from './comments.service';
import { Comments } from './comments.entity';
import { CommentsDataDto } from './dto/comments-data.dto';
import { PostIdDto } from '../posts/dto/post-id.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { PostPageDto } from '../posts/dto/post-page.dto';

@UseGuards(JwtAuthGuard)
@Controller('posts/:id/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getAll(
    @Query() page: PostPageDto,
    @Param() postId: PostIdDto,
    @Res() res: Response,
  ): Promise<Response> {
    const comments = await this.commentsService.getAll(page, postId);
    if (comments.comments.length > 0) {
      return res.status(HttpStatus.OK).send(comments);
    }
    return res.status(HttpStatus.NOT_FOUND).send({
      posts: [],
      message: [`Can\`t get posts on page ${page.page || 0}`],
    });
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
