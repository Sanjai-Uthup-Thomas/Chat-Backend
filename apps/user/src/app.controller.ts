import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('UserService', 'CreateUser')
  createUser(data: { email: string; name: string }) {
    return this.appService.createUser(data);
  }

  @GrpcMethod('UserService', 'GetUserById')
  getUserById(data: { id: string }) {
    return this.appService.getUserById(data);
  }
}
