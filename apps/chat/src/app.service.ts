import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { NotificationService } from './interfaces/notification.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageSchema } from './schemas/message.schema';
import { MessageDocument } from './schemas/message.schema';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService implements OnModuleInit {
  private notificationService: NotificationService;
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @Inject('NOTIFICATION_PACKAGE') private client: ClientGrpc,
  ) { }

  onModuleInit() {
    this.notificationService = this.client.getService<NotificationService>('NotificationService');
  }

  async sendMessage(data: { senderId: string; receiverId: string; content: string }) {
    try {
      const msg = new this.messageModel(data);
      await msg.save();
      await firstValueFrom(
        this.notificationService
          .sendNotification({
            userId: data.receiverId,
            message: `You received a message from ${data.senderId}`,
          })
      );
      console.log('Calling NotificationService with', {
        userId: data.receiverId,
        message: `You received a message from ${data.senderId}`,
      });
      return {
        id: msg._id?.toString() ?? null,
        senderId: msg.senderId,
        receiverId: msg.receiverId,
        content: msg.content,
        timestamp: msg.createdAt?.toISOString() ?? null,
      };
    } catch (error) {
      console.log("error==>", error);

    }

  }

  async getMessages(data: { senderId: string; receiverId: string }) {
    const messages = await this.messageModel.find({
      $or: [
        { senderId: data.senderId, receiverId: data.receiverId },
        { senderId: data.receiverId, receiverId: data.senderId },
      ],
    }).sort({ createdAt: 1 });

    return {
      messages: messages.map(msg => ({
        id: msg._id?.toString() ?? null,
        senderId: msg.senderId,
        receiverId: msg.receiverId,
        content: msg.content,
        timestamp: msg.createdAt?.toISOString() ?? null,
      })),
    };
  }
}


