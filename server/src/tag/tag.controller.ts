import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { AddTagDto, GetTagById, GetTagDto } from './dto';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { AccessTokenGuard } from 'src/auth/guards';
import { Request } from 'express';

@Controller('api/files')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  getTags() {
    return this.tagService.getTags();
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  addFile(@Req() req: Request) {
    return this.tagService.addFile(req.body);
  }

  @UseGuards(AccessTokenGuard)
  @Get('myTags')
  getMyTags(@GetUser() user: User) {
    return this.tagService.getMyTags(user['userId']);
  }

  @Get('popular')
  getPopularTags() {
    return this.tagService.getPopularTags();
  }

  @Get(':name')
  async getTagById(@Param() params: GetTagById, @Query() query: GetTagDto) {
    return await this.tagService.getTagById(params.name, query);
  }

  @Post()
  async addTag(@Body() dto: AddTagDto) {
    return await this.tagService.addTag(dto);
  }

  @UseGuards(AccessTokenGuard)
  @Post('myTag/add/:name')
  async addMyTag(@GetUser() user: User, @Param() params: GetTagById) {
    return await this.tagService.addMyTag(user['userId'], params.name);
  }

  @UseGuards(AccessTokenGuard)
  @Post('myTag/remove/:name')
  async removeMyTag(@GetUser() user: User, @Param() params: GetTagById) {
    return await this.tagService.removeMyTag(user['userId'], params.name);
  }
}
