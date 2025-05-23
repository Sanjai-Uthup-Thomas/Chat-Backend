import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('ChatService', 'SendMessage')
  sendMessage(data: any) {
    return this.appService.sendMessage(data);
  }

  @GrpcMethod('ChatService', 'GetMessages')
  getMessages(data: any) {
    return this.appService.getMessages(data);
  }
}
