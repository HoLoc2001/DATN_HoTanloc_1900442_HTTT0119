import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { EventGateway } from 'src/event.gateway';

@Module({
  controllers: [LikeController],
  providers: [LikeService, EventGateway],
})
export class LikeModule {}
