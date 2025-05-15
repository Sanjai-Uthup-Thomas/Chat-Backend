import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('NotificationService', 'SendNotification')
  sendNotification(data: { userId: string; message:string }) {
    return this.appService.sendNotification(data);
  }
}
