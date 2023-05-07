import { Transform, TransformFnParams, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class GetArticleId {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  articleId: number;
}
