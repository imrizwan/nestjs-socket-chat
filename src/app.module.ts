import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
@Module({
  imports: [
    DatabaseModule,
    EventsModule
  ],
})
export class AppModule { }