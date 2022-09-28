import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { DatabaseModule } from './database/database.module';
import { MessageModule } from './message/message.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.development' }),
    DatabaseModule,
    EventsModule,
    MessageModule,
  ],
})
export class AppModule {}
