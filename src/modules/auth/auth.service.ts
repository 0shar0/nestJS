import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User, UserDocument } from '../../schemas/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { serverError, success } from '../../constants/constants';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async register(username: string, password: string) {
    try {
      const hashPassword = await bcrypt.hash(password, 5);
      await this.userModel.create({
        username,
        password: hashPassword,
      });
      return { message: success };
    } catch (e) {
      throw new InternalServerErrorException({ message: serverError });
    }
  }
  async login(username: string) {
    try {
      const user = await this.userModel.findOne({ username });
      return {
        message: success,
        jwt_token: this.jwtService.sign({ username, id: user._id }),
      };
    } catch (e) {
      throw new InternalServerErrorException({ message: serverError });
    }
  }
}
