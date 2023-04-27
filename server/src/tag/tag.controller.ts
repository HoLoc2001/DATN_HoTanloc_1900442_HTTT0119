import { Controller, Get, Param } from '@nestjs/common';
import { TagService } from './tag.service';
import { GetTagById } from './dto';

@Controller('api/tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  getTags() {
    return this.tagService.getTags();
  }

  @Get(':name')
  getTagById(@Param() params: GetTagById) {
    return this.tagService.getTagById(params.name);
  }
}
