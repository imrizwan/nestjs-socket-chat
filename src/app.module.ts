import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'sammy',
      password: 'Hello@123',
      database: 'chat',
      entities: [],
      synchronize: true,
    }),
    EventsModule
  ],
})
export class AppModule { }