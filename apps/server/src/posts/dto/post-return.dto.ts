import { Field, ObjectType } from '@nestjs/graphql';
import Posts from '../posts.entity';

@ObjectType()
export class PostReturnDto {
  @Field(() => [Posts])
  posts: Posts[];

  @Field()
  total: number;
}
