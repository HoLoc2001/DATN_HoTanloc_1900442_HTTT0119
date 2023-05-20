import { GetUserById } from './dto/getUserById.dto';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
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
    return await this.userService.getProfile(user['userId']);
  }

  @Get(':id')
  async getUserById(@Param() params: GetUserById) {
    return await this.userService.getUserById(params.id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('edit')
  async edit(@GetUser() user: User, @Body() dto: EditUser) {
    return await this.userService.editUser(user['userId'], dto);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('editPassword')
  async editPassword(@GetUser() user: User, @Body() dto: EditPassword) {
    return await this.userService.editPassword(user['userId'], dto);
  }

  @UseGuards(AccessTokenGuard)
  @Post('follow/:id')
  async follow(@GetUser() user: User, @Param() params: GetUserById) {
    return await this.userService.follow(user['userId'], params.id);
  }

  @UseGuards(AccessTokenGuard)
  @Get('follow/:id')
  async getHasFollow(@GetUser() user: User, @Param() params: GetUserById) {
    return await this.userService.getHasFollow(user['userId'], params.id);
  }
}
