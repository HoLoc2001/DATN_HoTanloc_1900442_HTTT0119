import { BookmarkController } from './bookmark.controller';
import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';

@Module({
  controllers: [BookmarkController],
  providers: [BookmarkService],
})
export class BookmarkModule {}
