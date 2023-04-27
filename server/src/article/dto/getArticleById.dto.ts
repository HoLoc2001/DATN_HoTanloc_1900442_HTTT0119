import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetArticleById {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id: number;
}
