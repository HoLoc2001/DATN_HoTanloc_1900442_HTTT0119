import { IsNotEmpty, IsString } from 'class-validator';

export class Comment {
  @IsString()
  @IsNotEmpty()
  content: string;
}
