import { UserService } from './user.service';
import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { EditPassword, EditUser } from './dto';
import { GoogleOAuthGuard } from 'src/auth/guards/google-oauth.guard';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AccessTokenGuard)
  @Get('profile')
  getMe(@GetUser() user: User) {
    return user;
  }

  @UseGuards(AccessTokenGuard)
  @Patch('edit')
  edit(@GetUser() user: User, @Body() dto: EditUser) {
    return this.userService.editUser(user.id, dto);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('editPassword')
  editPassword(@GetUser() user: User, @Body() dto: EditPassword) {
    return this.userService.editPassword(user.id, dto);
  }
}
