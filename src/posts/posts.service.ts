import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Posts from './posts.entity';
import { Repository } from 'typeorm';
import { PostDataDto } from './dto/post-data.dto';
import { PostIdDto } from './dto/post-id.dto';
import { Users } from '../users/users.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
  ) {}

  async getAll(): Promise<Posts[]> {
    return this.postsRepository.find();
  }

  async create(postData: PostDataDto): Promise<Posts> {
    const post = await this.postsRepository.create(postData);
    return this.postsRepository.save(post);
  }

  async like(postId: PostIdDto, userId: Users): Promise<Posts> {
    const post = await this.postsRepository.findOne(postId);
    post.likes.push(userId);
    return this.postsRepository.save(post);
  }

  async unLike(postId: PostIdDto, userId: any): Promise<Posts> {
    const post = await this.postsRepository.findOne(postId);
    return this.postsRepository.save(post);
  }
}
