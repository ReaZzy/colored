import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Posts from './posts.entity';
import { Repository } from 'typeorm';
import { PostDataDto } from './dto/post-data.dto';
import { PostIdDto } from './dto/post-id.dto';
import { Users } from '../users/users.entity';
import { PostPageDto } from './dto/post-page.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
  ) {}

  async getAll(page?: PostPageDto): Promise<{ posts: Posts[]; total: number }> {
    const take = 2;
    const skip = (page.page - 1) * take;
    const [result, total] = await this.postsRepository
      .createQueryBuilder('posts')
      .leftJoin('posts.user', 'user')
      .leftJoin('posts.likes', 'likes')
      .select(['posts', 'likes.login', 'likes.id'])
      .skip(skip || 0)
      .take(take)
      .getManyAndCount();

    return {
      posts: result,
      total,
    };
  }

  async create(postData: PostDataDto): Promise<Posts> {
    const post = await this.postsRepository.create(postData);
    return this.postsRepository.save(post);
  }

  async like(postId: PostIdDto, userId: Users): Promise<Posts> {
    const post = await this.postsRepository.findOne({
      where: {
        id: postId.id,
      },
      relations: ['likes'],
    });
    await post.likes.push(userId);
    return this.postsRepository.save(post);
  }

  async unLike(postId: PostIdDto, userId: Users): Promise<Posts> {
    const post = await this.postsRepository.findOne(postId, {
      relations: ['likes'],
    });
    post.likes = post.likes.filter((user) => user.id !== userId.id);
    return this.postsRepository.save(post);
  }
}
