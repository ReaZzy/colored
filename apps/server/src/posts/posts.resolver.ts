import { UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import Posts from './posts.entity';
import { PostDataDto } from './dto/post-data.dto';
import { GqgAuthGuard } from 'src/guards/gql-auth.guard';
import {
  Args,
  ID,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PostReturnDto } from './dto/post-return.dto';
import { CurrentUser } from '../auth/auth.resolver';
import { Users } from '../users/users.entity';
import { PostUpdateDto } from './dto/post-update.dto';
import { PubSub } from 'graphql-subscriptions';

@UseGuards(GqgAuthGuard)
@Resolver()
export class PostsResolver {
  private pubSub: PubSub;
  constructor(private readonly postsService: PostsService) {
    this.pubSub = new PubSub();
  }

  @Query(() => PostReturnDto)
  async getAllPosts(
    @Args({ name: 'page', type: () => Number }) page: number
  ): Promise<PostReturnDto> {
    return this.postsService.getAll(page);
  }

  @Query(() => Posts)
  async getPostById(
    @Args({ name: 'postId', type: () => ID }) postId: string
  ): Promise<Posts> {
    return this.postsService.getById(postId);
  }

  @Mutation(() => Posts)
  async createPost(
    @Args({ name: 'post', type: () => PostDataDto })
    post: PostDataDto,
    @CurrentUser() user: Users
  ): Promise<Posts> {
    post.userId = user.id;
    const postCreated = this.postsService.create(post);
    await this.pubSub.publish('getPostSubscription', {
      getPostSubscription: postCreated,
    });
    return postCreated;
  }
  @Mutation(() => Posts)
  async updatePost(
    @Args({ name: 'postId', type: () => ID }) postId: string,
    @Args({ name: 'postData', type: () => PostUpdateDto })
    postData: PostUpdateDto,
    @CurrentUser() user: Users
  ): Promise<Posts> {
    return this.postsService.update(postId, postData, user.id);
  }

  @Mutation(() => Posts)
  async like(
    @Args({ name: 'postId', type: () => ID }) postId: string,
    @CurrentUser() user: Users
  ): Promise<Posts> {
    return this.postsService.like(postId, user);
  }

  @Mutation(() => Posts)
  async unLike(
    @Args({ name: 'postId', type: () => ID }) postId: string,
    @CurrentUser() user: Users
  ): Promise<Posts> {
    return this.postsService.unLike(postId, user);
  }

  @Subscription(() => Posts)
  async getPostSubscription(): Promise<AsyncIterator<Posts>> {
    return this.pubSub.asyncIterator('getPostSubscription');
  }
}
