import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { EventGateway } from 'src/event.gateway';

@Module({
  controllers: [TagController],
  providers: [TagService, EventGateway],
})
export class TagModule {}
