import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class EditUser {
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  avatar: string;

  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  lastName: string;

  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  firstName: string;
}

export class EditPassword {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
