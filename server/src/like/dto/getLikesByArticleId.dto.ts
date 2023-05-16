import { Transform, TransformFnParams, Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class GetLikesByArticleId {
  @Type(() => Number)
  @IsInt()
  articleId: number;
}
