import { IsInt, IsNotEmpty } from 'class-validator';

export class DeleteArticle {
  @IsInt()
  @IsNotEmpty()
  id: number;
}
