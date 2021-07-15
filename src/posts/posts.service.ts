import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Posts from './posts.entity';
import { Repository } from 'typeorm';
import { PostDataDto } from './dto/post-data.dto';
import { PostIdDto } from './dto/post-id.dto';

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

  async like(postId: PostIdDto): Promise<Posts> {
    const post = await this.postsRepository.findOne(postId);
    post.likes += 1;
    return this.postsRepository.save(post);
  }

  async unLike(postId: PostIdDto): Promise<Posts> {
    const post = await this.postsRepository.findOne(postId);
    post.likes -= 1;
    return this.postsRepository.save(post);
  }
}
