import { UseGuards } from '@nestjs/common';
import { GqgAuthGuard } from '../guards/gql-auth.guard';
import {
  Args,
  Field,
  ID,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comments } from './comments.entity';
import { CommentsDataDto } from './dto/comments-data.dto';
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
  async getAllComments(
    @Args('page') page: number,
    @Args('postId') postId: string
  ): Promise<commentsOutput> {
    return this.commentsService.getAll(page, postId);
  }

  @Mutation(() => Comments)
  async createComment(
    @Args({ name: 'postId', type: () => ID }) postId: string,
    @Args('commentsData') commentsData: CommentsDataDto,
    @CurrentUser() user: Users
  ): Promise<Comments> {
    commentsData.postId = postId;
    commentsData.userId = user.id;
    return this.commentsService.create(commentsData);
  }
}
