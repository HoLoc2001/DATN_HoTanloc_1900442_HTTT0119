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
import { AuthDto, SignUpAuthDto } from './dto';
import { AccessTokenGuard, RefreshTokenGuard } from 'src/auth/guards';
import { GetUser } from './decorator';
import { User } from '@prisma/client';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import { Request, Response } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Req() req: Request) {
    return 1;
  }

  @UseGuards(GoogleOAuthGuard)
  @Get('google-redirect')
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {

    const tokens = await this.authService.googleLogin(req, res);

    if (tokens === null) {
      return res.redirect('http://localhost:5173/signin?error=403')
    }
    res.cookie('auth-cookie', JSON.stringify(tokens), {
      expires: new Date(Date.now() + 1 * 60 * 1000),
    });
    return res.redirect('http://localhost:5173');
  }

  @Post('signupLocal')
  async signup(@Body() dto: SignUpAuthDto, @Res() res: Response) {
    const user = await this.authService.signup(dto);

    return res.json({ success: true, ...user });
  }

  @HttpCode(HttpStatus.OK)
  @Post('signinLocal')
  async signin(@Body() dto: AuthDto, @Res() res: Response) {
    const user = await this.authService.signin(dto);

    return res.json({ success: true, ...user });
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  @Get('signout')
  signout(@Req() req: Request) {
    this.authService.signout(req.user['userId']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refreshToken')
  refreshTokens(@GetUser() user: User) {
    const userId = user['userId'];
    const refreshToken = user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
