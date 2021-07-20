import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PostPageDto {
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  page: number;
}
