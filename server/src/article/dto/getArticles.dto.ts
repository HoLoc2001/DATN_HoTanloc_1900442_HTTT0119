import { Transform, TransformFnParams, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, isString } from 'class-validator';

export class GetArticlesDto {
  // @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit: number;

  // @IsOptional()
  @Type(() => Number)
  @IsInt()
  offset: number;

  @IsString()
  type: any;
}
