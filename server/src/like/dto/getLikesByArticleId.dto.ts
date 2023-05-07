import { Transform, TransformFnParams, Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class GetLikesByArticleId {
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Type(() => Number)
  @IsInt()
  articleId: number;
}
