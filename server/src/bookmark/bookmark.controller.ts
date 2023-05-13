import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { AccessTokenGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { Response } from 'express';
import { GetArticleId, GetBookmarksDto } from './dto';

@Controller('api/bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  async getBookmarks(
    @GetUser() user: User,
    @Res() res: Response,
    @Query() query: GetBookmarksDto,
  ) {
    const articles = await this.bookmarkService.getBookmarks(
      user['userId'],
      query,
    );

    if (articles) {
      return res.status(HttpStatus.OK).json(articles);
    }
    return res
      .status(HttpStatus.NO_CONTENT)
      .json({ statusCode: 204, msg: 'NO_CONTENT' });
  }

  @UseGuards(AccessTokenGuard)
  @Post(':articleId')
  async addBookmark(
    @Param() params: GetArticleId,
    @GetUser() user: User,
    @Res() res: Response,
  ) {
    const articles = await this.bookmarkService.addBookmark(
      user['userId'],
      params.articleId,
    );
    if (articles) {
      return res.status(HttpStatus.CREATED).json(articles);
    }
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ statusCode: 500, msg: 'INTERNAL_SERVER_ERROR' });
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':articleId')
  async deleteBookmark(
    @Param() params: GetArticleId,
    @GetUser() user: User,
    @Res() res: Response,
  ) {
    const article = await this.bookmarkService.deleteBookmark(
      user['userId'],
      params.articleId,
    );
    if (article) {
      return res.status(HttpStatus.OK).json({ statusCode: 200, msg: 'OK' });
    }
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ statusCode: 500, msg: 'INTERNAL_SERVER_ERROR' });
  }
}
