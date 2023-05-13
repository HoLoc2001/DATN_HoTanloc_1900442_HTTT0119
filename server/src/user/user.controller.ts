import { GetUserById } from './dto/getUserById.dto';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { EditPassword, EditUser } from './dto';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AccessTokenGuard)
  @Get('profile')
  async getMe(@GetUser() user: User) {
    console.log(123, user);
    return await this.userService.getProfile(user['userId']);
  }

  @Get(':id')
  async getUserById(@Param() params: GetUserById) {
    return await this.userService.getUserById(params.id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('edit')
  async edit(@GetUser() user: User, @Body() dto: EditUser) {
    return await this.userService.editUser(user.id, dto);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('editPassword')
  async editPassword(@GetUser() user: User, @Body() dto: EditPassword) {
    return await this.userService.editPassword(user.id, dto);
  }
}
