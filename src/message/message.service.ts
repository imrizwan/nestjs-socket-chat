import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Message } from '../database/entities/message/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @Inject('MESSAGE_REPOSITORY')
    private messageRepository: Repository<Message>,
  ) { }

  async findAll(): Promise<Message[]> {
    return this.messageRepository.find();
  }

  async addMessage(message: Message) {
    let ans = await this.messageRepository
      .createQueryBuilder()
      .insert()
      .into(Message)
      .values(message).execute()
    return ans;
  }
}