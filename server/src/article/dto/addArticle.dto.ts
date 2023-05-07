import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class AddArticle {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @IsArray()
  tags: string[];
}
