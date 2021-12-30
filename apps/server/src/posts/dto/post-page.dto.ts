import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PostPageDto {
  @Field()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  page: number;
}
