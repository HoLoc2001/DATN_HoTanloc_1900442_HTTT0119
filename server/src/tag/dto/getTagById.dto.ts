import { IsNotEmpty, IsString } from 'class-validator';

export class GetTagById {
  @IsString()
  @IsNotEmpty()
  name: string;
}
