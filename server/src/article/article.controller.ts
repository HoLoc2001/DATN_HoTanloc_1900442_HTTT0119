import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { AccessTokenGuard } from 'src/auth/guards';
import { GetArticles } from './dto';

@Controller('api/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // @UseGuards(AccessTokenGuard)
  @Get()
  getAllArticles(@Query() params: GetArticles) {
    return this.articleService.getArticle(params);
  }
}
