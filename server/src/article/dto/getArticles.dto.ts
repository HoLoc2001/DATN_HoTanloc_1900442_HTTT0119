import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetArticles {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  limit: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  offset: number;
}
