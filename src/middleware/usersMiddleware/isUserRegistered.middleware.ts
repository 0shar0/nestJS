import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schemas/users.schema';
import { Model } from 'mongoose';
import { noUser } from '../../constants/constants';

export class IsUserRegisteredMiddleware implements NestMiddleware {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async use(req, res, next) {
    const { username } = req.body;
    const candidate = await this.userModel.findOne({ username });
    if (!candidate) {
      throw new BadRequestException({ message: noUser });
    }
    next();
  }
}
