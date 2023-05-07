import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class GetArticleId {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  articleId: number;
}
