import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { AccessTokenGuard, RefreshTokenGuard } from 'src/auth/guards';
import { GetUser } from './decorator';
import { User } from '@prisma/client';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import { Request } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Req() req: Request) {}

  @UseGuards(GoogleOAuthGuard)
  @Get('google-redirect')
  googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    return this.authService.googleLogin(req, res);
  }

  @Post('signupLocal')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signinLocal')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    this.authService.logout(req.user['userId']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@GetUser() user: User) {
    const userId = user['userId'];
    const refreshToken = user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
