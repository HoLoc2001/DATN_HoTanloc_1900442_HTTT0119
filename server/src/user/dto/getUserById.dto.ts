import { Transform, TransformFnParams, Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetUserById {
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Type(() => Number)
  @IsInt()
  id: number;
}
