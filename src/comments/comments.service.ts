import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from './comments.entity';
import { Repository } from 'typeorm';
import { CommentsDataDto } from './dto/comments-data.dto';
import { PostIdDto } from '../posts/dto/post-id.dto';
import { PostPageDto } from '../posts/dto/post-page.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private readonly commentsRepository: Repository<Comments>,
  ) {}

  async getAll(
    page: PostPageDto,
    postId: PostIdDto,
  ): Promise<{ comments: Comments[]; total: number }> {
    const take = 2;
    const skip = (page.page - 1) * take;
    const [result, total] = await this.commentsRepository.findAndCount({
      take: take,
      skip: skip || 0,
      relations: ['replies'],
      where: {
        postId: postId.id,
        commentsId: null,
      },
    });
    return {
      comments: result,
      total,
    };
  }

  async create(commentData: CommentsDataDto): Promise<Comments> {
    const comment = await this.commentsRepository.create(commentData);
    return this.commentsRepository.save(comment);
  }
}