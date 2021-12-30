import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsOptional, IsString, Length } from 'class-validator';

@InputType()
export class CommentsDataDto {
  @Field()
  @IsDefined()
  @IsString()
  @Length(10, 350)
  content: string;

  @Field({ nullable: true })
  @IsOptional()
  repliedTo: string;

  @Field({ nullable: true })
  @Field()
  postId: string;

  @Field({ nullable: true })
  @Field()
  userId: string;
}
