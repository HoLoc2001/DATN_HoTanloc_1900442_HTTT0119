import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TagService } from './tag.service';
import { AddTagDto, GetTagById } from './dto';

@Controller('api/tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  getTags() {
    return this.tagService.getTags();
  }

  @Get(':name')
  async getTagById(@Param() params: GetTagById) {
    return await this.tagService.getTagById(params.name);
  }

  @Post()
  async addTag(@Body() dto: AddTagDto) {
    return await this.tagService.addTag(dto);
  }
}
