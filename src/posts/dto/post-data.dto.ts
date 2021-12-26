import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsString, Length, Matches } from 'class-validator';

@InputType()
export class PostDataDto {
  @Field()
  @IsString()
  @Length(3, 2500)
  @IsDefined()
  readonly content: string;

  @Field()
  @Matches(new RegExp('^#(?:[0-9a-fA-F]{3}){1,2}$', 'i'), {
    message: 'invalid color',
  })
  color: string;

  @Field({ nullable: true })
  userId?: string;
}
