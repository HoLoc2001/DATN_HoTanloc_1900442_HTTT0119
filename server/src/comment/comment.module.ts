import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { EventGateway } from 'src/event.gateway';

@Module({
  controllers: [CommentController],
  providers: [CommentService, EventGateway],
})
export class CommentModule {}
