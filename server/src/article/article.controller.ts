import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { AccessTokenGuard } from 'src/auth/guards';
import {
  UpdateArticleDto,
  GetArticlesDto,
  AddArticle,
  DeleteArticle,
  GetArticleByIdDto,
  GetArticlesByUserIdDto,
} from './dto';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { Request, Response } from 'express';

@Controller('api/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('all')
  async getAllArticles() {
    return await this.articleService.getAllArticles();
  }

  @Get(':articleId')
  async getArticleById(@Param() params: GetArticleByIdDto) {
    return await this.articleService.getArticle(params.articleId);
  }

  // @UseGuards(AccessTokenGuard)
  @Get()
  async getArticles(
    @Query() query: GetArticlesDto,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    console.log(request.cookies);
    const articles = await this.articleService.getArticles(query);
    if (articles) {
      return res.json(articles);
    }

    return res
      .status(HttpStatus.NO_CONTENT)
      .json({ statusCode: 204, msg: 'NO_CONTENT' });
  }

  @Get('user/:userId')
  async getArticlesByUserId(
    @Param() user: GetArticlesByUserIdDto,
    @Query() query: GetArticlesDto,
  ) {
    return await this.articleService.getArticlesByUserId(user.userId, query);
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  async addArticle(@Body() dto: AddArticle, @GetUser() user: User) {
    const article = await this.articleService.addArticle(user['userId'], dto);
    return article;
  }

  @UseGuards(AccessTokenGuard)
  @Put(':articleId')
  async updateArticle(
    @Param() params: GetArticleByIdDto,
    @Body() dto: UpdateArticleDto,
    @GetUser() user: User,
    @Res() res: Response,
  ) {
    const { count } = await this.articleService.updateArticle(
      user['userId'],
      params.articleId,
      dto,
    );

    if (count === 1) {
      return res.status(HttpStatus.OK).json({ statusCode: 200, msg: 'OK' });
    }

    return res
      .status(HttpStatus.PRECONDITION_FAILED)
      .json({ statusCode: 412, msg: 'PRECONDITION_FAILED' });
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':articleId')
  async deleteArticle(
    @Param() params: GetArticleByIdDto,
    @GetUser() user: User,
    @Res() res: Response,
  ) {
    await this.articleService.deleteArticle(user['userId'], params.articleId);
    return res.status(HttpStatus.OK).json({ statusCode: 200, msg: 'OK' });
  }
}
