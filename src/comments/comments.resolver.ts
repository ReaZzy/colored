import { Body, Param, Post, Req, UseGuards } from '@nestjs/common';
import { GqgAuthGuard } from '../guards/gql-auth.guard';
import {
  Resolver,
  Query,
  ObjectType,
  Field,
  Int,
  Args,
  Mutation,
  ID,
} from '@nestjs/graphql';
import { Request } from 'express';
import { CommentsService } from './comments.service';
import { Comments } from './comments.entity';
import { CommentsDataDto } from './dto/comments-data.dto';
import { PostIdDto } from '../posts/dto/post-id.dto';
import { PostPageDto } from '../posts/dto/post-page.dto';
import { CurrentUser } from '../auth/auth.resolver';
import { Users } from 'src/users/users.entity';

@ObjectType()
class commentsOutput {
  @Field(() => [Comments])
  comments: Comments[];

  @Field(() => Int)
  total: number;
}

@UseGuards(GqgAuthGuard)
@Resolver()
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Query(() => commentsOutput)
  async getAll(
    @Args('page') page: number,
    @Args('postId') postId: string,
  ): Promise<commentsOutput> {
    return this.commentsService.getAll(page, postId);
  }

  @Mutation(() => Comments)
  async create(
    @Args({ name: 'postId', type: () => ID }) postId: string,
    @Args('commentsData') commentsData: CommentsDataDto,
    @CurrentUser() user: Users,
  ): Promise<Comments> {
    commentsData.postId = postId;
    commentsData.userId = user.id;
    return this.commentsService.create(commentsData);
  }
}
