import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class GetMailDto {
  // @IsOptional()

  @IsString()
  mail: string;
}
