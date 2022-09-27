import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database.module';
import { messageProviders } from './message.providers';
import { MessageService } from './message.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...messageProviders,
    MessageService,
  ],
})
export class MessageModule {}