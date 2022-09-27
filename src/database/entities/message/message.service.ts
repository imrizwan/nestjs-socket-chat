import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @Inject('MESSAGE_REPOSITORY')
    private messageRepository: Repository<Message>,
  ) {}

  async findAll(): Promise<Message[]> {
    return this.messageRepository.find();
  }

  async addMessage(): Promise<Message[]> {
    return this.messageRepository.find();
  }
}