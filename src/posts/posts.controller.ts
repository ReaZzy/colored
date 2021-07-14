import { Controller, Get } from '@nestjs/common';
import { PostsService } from './posts.service';
import Posts from './posts.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAll(): Promise<Posts[]> {
    return this.postsService.getAll();
  }
}
