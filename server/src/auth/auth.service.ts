import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: AuthDto) {
    try {
      const emailExists = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
      if (emailExists) {
        throw new BadRequestException('Email already exists');
      }

      const hashPass = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashPass,
        },
        select: {
          id: true,
        },
      });
      const tokens = await this.signToken(user.id);
      await this.updateRefreshToken(user.id, tokens.refreshToken);

      return tokens;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto): Promise<object> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (!user) throw new ForbiddenException('Credentials incorrect');

      const pwMatches = await argon.verify(user.password, dto.password);
      if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
      delete user.password;

      const tokens = await this.signToken(user.id);
      await this.updateRefreshToken(user.id, tokens.refreshToken);
      return { tokens };
    } catch (error) {
      throw error;
    }
  }

  async logout(userId: number) {
    return this.updateRefreshToken(userId, null);
  }

  async signToken(userId: number) {
    const accessToken = await this.jwt.signAsync(
      { userId },
      {
        expiresIn: this.config.get('ACCESS_TOKEN_EXPIRES_IN'),
        secret: this.config.get('ACCESS_TOKEN_SECRET'),
      },
    );

    const refreshToken = await this.jwt.signAsync(
      { userId },
      {
        expiresIn: this.config.get('REFRESH_TOKEN_EXPIRES_IN'),
        secret: this.config.get('REFRESH_TOKEN_SECRET'),
      },
    );

    return { accessToken, refreshToken };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    let hashedRefreshToken = null;
    if (refreshToken) {
      hashedRefreshToken = await argon.hash(refreshToken);
    }
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: hashedRefreshToken,
      },
    });
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        refreshToken: true,
      },
    });

    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await argon.verify(
      user.refreshToken,
      refreshToken,
    );

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.signToken(user.id);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
