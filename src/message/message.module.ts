import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { messageProviders } from './message.providers';
import { MessageService } from './message.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...messageProviders,
    MessageService,
  ],
  exports: [MessageService]
})
export class MessageModule {}