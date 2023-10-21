import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class GetBookmarksDto {
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
