import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class DeleteArticle {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id: number;
}
