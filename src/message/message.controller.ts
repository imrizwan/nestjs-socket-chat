import { Controller, Get, Post, Body } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from '../database/entities/message/message.entity';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get('all')
  async findAll(): Promise<Message[]> {
    return this.messageService.findAll();
  }
}