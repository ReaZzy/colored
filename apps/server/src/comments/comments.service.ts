import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from './comments.entity';
import { Repository } from 'typeorm';
import { CommentsDataDto } from './dto/comments-data.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private readonly commentsRepository: Repository<Comments>
  ) {}

  async getAll(
    page: number,
    postId: string
  ): Promise<{ comments: Comments[]; total: number }> {
    if (page < 1) page = 1;
    const take = 2;
    const skip = (page - 1) * take;
    const [result, total] = await this.commentsRepository.findAndCount({
      take: take,
      skip: skip || 0,
      relations: ['replies'],
      where: {
        postId: postId,
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
