import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { messageProviders } from './message.providers';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
@Module({
  imports: [DatabaseModule],
  providers: [...messageProviders, MessageService],
  exports: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
