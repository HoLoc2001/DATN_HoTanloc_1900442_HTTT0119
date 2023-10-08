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
  GetUserIdDto,
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

  @UseGuards(AccessTokenGuard)
  @Get('auth')
  async getArticlesAuth(
    @Query() query: GetArticlesDto,
    @GetUser() user: User,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    const articles = await this.articleService.getArticlesAuth(
      query,
      user['userId'],
    );
    console.log(articles);
    if (articles) {
      return res.json(articles);
    }

    return res
      .status(HttpStatus.NO_CONTENT)
      .json({ statusCode: 204, msg: 'NO_CONTENT' });
  }

  @Get()
  async getArticles(
    @Query() query: GetArticlesDto,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    const articles = await this.articleService.getArticles(query);
    if (articles) {
      return res.json(articles);
    }

    return res
      .status(HttpStatus.NO_CONTENT)
      .json({ statusCode: 204, msg: 'NO_CONTENT' });
  }

  @UseGuards(AccessTokenGuard)
  @Get('auth/user/:userId')
  async getArticlesByUserIdAuth(
    @Param() param: GetArticlesByUserIdDto,
    @Query() query: GetArticlesDto,
    @GetUser() user: User,
  ) {
    return await this.articleService.getArticlesByUserIdAuth(
      param.userId,
      user['userId'],
      query,
    );
  }

  @UseGuards(AccessTokenGuard)
  @Get('/myUser')
  async getMyArticles(@Query() query: GetArticlesDto, @GetUser() user: User) {
    return await this.articleService.getMyArticles(user['userId'], query);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/tuyendung')
  async getTuyendung(@Query() query: GetArticlesDto, @GetUser() user: User) {
    return await this.articleService.getTuyendung(user['userId'], query);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/hoidap')
  async getHoidap(@Query() query: GetArticlesDto, @GetUser() user: User) {
    return await this.articleService.getHoidap(user['userId'], query);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/tintuc')
  async getTintuc(@Query() query: GetArticlesDto, @GetUser() user: User) {
    return await this.articleService.getTintuc(user['userId'], query);
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
  async addArticle(@Body() dto: any, @GetUser() user: User) {
    console.log(dto);
    const article = await this.articleService.addArticle(user['userId'], dto);
    return article;
  }

  @UseGuards(AccessTokenGuard)
  @Put(':articleId')
  async updateArticle(
    @Param() params: GetArticleByIdDto,
    @Body() dto: any,
    @GetUser() user: User,
    @Res() res: Response,
  ) {
    const article = await this.articleService.updateArticle(
      user['userId'],
      params.articleId,
      dto,
    );

    if (article) {
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

  @UseGuards(AccessTokenGuard)
  @Get('auth/:articleId')
  async getArticleByIdAuth(
    @Param() params: GetArticleByIdDto,
    @GetUser() user: User,
  ) {
    return await this.articleService.getArticleAuth(
      params.articleId,
      user['userId'],
    );
  }

  @Get(':articleId')
  async getArticleById(@Param() params: GetArticleByIdDto) {
    return await this.articleService.getArticle(params.articleId);
  }
}
