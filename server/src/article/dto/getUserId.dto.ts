import { Transform, TransformFnParams, Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetUserIdDto {
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Type(() => Number)
  @IsInt()
  userId: number;
}
