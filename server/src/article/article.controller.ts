import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { AccessTokenGuard } from 'src/auth/guards';
import {
  UpdateArticleDto,
  GetArticleById,
  GetArticlesDto,
  AddArticle,
} from './dto';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { Response } from 'express';

@Controller('api/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get(':id')
  getArticleById(@Param() params: GetArticleById) {
    this.articleService.getArticle(params.id);
  }

  @Get()
  getArticles(@Query() params: GetArticlesDto) {
    return this.articleService.getArticles(params);
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  async addArticle(@Body() dto: AddArticle, @GetUser() user: User) {
    const article = await this.articleService.addArticle(user['userId'], dto);
    return article;
  }

  @UseGuards(AccessTokenGuard)
  @Put(':id')
  async updateArticle(
    @Param() params: GetArticleById,
    @Body() dto: UpdateArticleDto,
    @GetUser() user: User,
    @Res() res: Response,
  ) {
    const { count } = await this.articleService.updateArticle(
      user['userId'],
      params.id,
      dto,
    );

    if (count === 1) {
      return res.status(HttpStatus.OK).json({ statusCode: 200, msg: 'OK' });
    }

    return res
      .status(HttpStatus.PRECONDITION_FAILED)
      .json({ statusCode: 412, msg: 'PRECONDITION_FAILED' });
  }
}
