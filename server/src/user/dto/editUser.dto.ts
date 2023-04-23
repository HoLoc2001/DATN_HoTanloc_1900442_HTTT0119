import { IsNotEmpty, IsString } from 'class-validator';

export class EditUser {
  @IsString()
  lastName: string;

  @IsString()
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
