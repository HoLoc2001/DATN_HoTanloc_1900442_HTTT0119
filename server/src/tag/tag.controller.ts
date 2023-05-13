import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TagService } from './tag.service';
import { AddTagDto, GetTagById, GetTagDto } from './dto';

@Controller('api/tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  getTags() {
    return this.tagService.getTags();
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
}
