import { Transform, TransformFnParams, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class GetCommentId {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  commentId: number;
}
