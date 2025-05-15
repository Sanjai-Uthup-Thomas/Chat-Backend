import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createUser(data: { email: string; name: string }) {
    const user = new this.userModel(data);
    await user.save();
    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    };
  }

  async getUserById(data: { id: string }) {
    const user = await this.userModel.findById(data.id);
    if (!user) return null;
    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    };
  }
}
