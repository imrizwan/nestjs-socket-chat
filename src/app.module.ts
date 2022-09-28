import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { DatabaseModule } from './database/database.module';
import { MessageModule } from './message/message.module';
@Module({
  imports: [
    DatabaseModule,
    EventsModule,
    MessageModule
  ],
})
export class AppModule { }