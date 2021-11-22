import { UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import Posts from './posts.entity';
import { PostDataDto } from './dto/post-data.dto';
import { GqgAuthGuard } from 'src/guards/gql-auth.guard';
import { Args, Query, Resolver, Mutation, ID } from '@nestjs/graphql';
import { PostReturnDto } from './dto/post-return.dto';
import { CurrentUser } from '../auth/auth.resolver';
import { Users } from '../users/users.entity';

@UseGuards(GqgAuthGuard)
@Resolver()
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => PostReturnDto)
  async getAllPosts(
    @Args({ name: 'page', type: () => Number }) page: number,
  ): Promise<PostReturnDto> {
    return this.postsService.getAll(page);
  }

  @Query(() => Posts)
  async getPostById(
    @Args({ name: 'postId', type: () => ID }) postId: string,
  ): Promise<Posts> {
    return this.postsService.getById(postId);
  }

  @Mutation(() => Posts)
  async createPost(
    @Args({ name: 'post', type: () => PostDataDto })
    post: PostDataDto,
    @CurrentUser() user: Users,
  ): Promise<Posts> {
    post.userId = user.id;
    return this.postsService.create(post);
  }

  @Mutation(() => Posts)
  async like(
    @Args({ name: 'postId', type: () => ID }) postId: string,
    @CurrentUser() user: Users,
  ): Promise<Posts> {
    return this.postsService.like(postId, user);
  }

  @Mutation(() => Posts)
  async unLike(
    @Args({ name: 'postId', type: () => ID }) postId: string,
    @CurrentUser() user: Users,
  ): Promise<Posts> {
    return this.postsService.unLike(postId, user);
  }
}
