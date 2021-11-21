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
  @IsString()
  @IsDefined()
  @Matches(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/gi, {
    message: 'invalid color',
  })
  color: string;

  @Field({ nullable: true })
  userId?: string;
}
