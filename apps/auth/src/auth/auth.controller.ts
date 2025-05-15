import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthService', 'SignUp')
  async signUp(data: { email: string; password: string }) {
    return this.authService.signup(data.email, data.password);
  }

  @GrpcMethod('AuthService', 'Login')
  async login(data: { email: string; password: string }) {
    return this.authService.login(data.email, data.password);
  }
}
