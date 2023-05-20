import { Transform, TransformFnParams, Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetUserById {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id: number;
}
