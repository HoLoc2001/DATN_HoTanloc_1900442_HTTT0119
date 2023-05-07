import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { GetLikesByArticleId } from './dto';
import { AccessTokenGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@Controller('api/like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Get(':articleId')
  async getLikesByArticleId(@Param() params: GetLikesByArticleId) {
    return await this.likeService.getLikesByArticleId(params.articleId);
  }

  @UseGuards(AccessTokenGuard)
  @Post(':articleId')
  async updateLikeByArticleId(
    @Param() params: GetLikesByArticleId,
    @GetUser() user: User,
  ) {
    await this.likeService.updateLikeByArticleId(
      params.articleId,
      user['userId'],
    );
  }
}
