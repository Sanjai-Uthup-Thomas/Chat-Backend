import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AppController {
  @GrpcMethod('AuthService', 'SignUp')
  signUp(data: any) {
    // Implement actual signup logic here
    return { accessToken: 'mocked-token-signup' };
  }

  @GrpcMethod('AuthService', 'Login')
  login(data: any) {
    // Implement actual login logic here
    return { accessToken: 'mocked-token-login' };
  }
}
