import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddTagDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
