import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchDto } from './dto';
import { AccessTokenGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@Controller('api/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}
  @UseGuards(AccessTokenGuard)
  @Get('auth')
  async getSearchAuth(@Query() query: SearchDto, @GetUser() user: User) {
    return await this.searchService.searchArticlesAuth(query, user['userId']);
  }

  @Get()
  async getSearch(@Query() query: SearchDto) {
    return await this.searchService.searchArticles(query);
  }
}
