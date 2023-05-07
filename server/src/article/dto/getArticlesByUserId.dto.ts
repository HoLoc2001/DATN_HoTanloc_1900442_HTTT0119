import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetArticlesByUserIdDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  userId: number;
}
