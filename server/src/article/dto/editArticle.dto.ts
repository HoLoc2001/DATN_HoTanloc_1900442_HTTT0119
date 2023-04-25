import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class EditArticle {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  tags: string[];
}
