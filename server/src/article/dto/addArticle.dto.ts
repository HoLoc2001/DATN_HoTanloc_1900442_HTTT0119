import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class AddArticle {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  tags: string[];
}
