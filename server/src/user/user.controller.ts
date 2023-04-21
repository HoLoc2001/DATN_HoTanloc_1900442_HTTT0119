import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe() {
    return 'me';
  }
}
