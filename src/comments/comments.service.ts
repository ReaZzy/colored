import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from './comments.entity';
import { Repository } from 'typeorm';
import { CommentsDataDto } from './dto/comments-data.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private readonly commentsRepository: Repository<Comments>,
  ) {}

  async getAll(): Promise<Comments[]> {
    return this.commentsRepository.find();
  }

  async create(commentData: CommentsDataDto): Promise<Comments> {
    const comment = await this.commentsRepository.create(commentData);
    return this.commentsRepository.save(comment);
  }
}
