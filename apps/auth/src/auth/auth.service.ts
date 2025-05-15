import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signup(email: string, password: string) {
    const existing = await this.userModel.findOne({ email });
    if (existing) throw new ConflictException('User already exists');

    const hashed = await bcrypt.hash(password, 10);
    const user = new this.userModel({ email, password: hashed });
    await user.save();

    const token = this.jwtService.sign({ email, sub: user._id });
    return { accessToken: token };
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign({ email, sub: user._id });
    return { accessToken: token };
  }
}
