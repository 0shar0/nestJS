import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { userExist } from '../../constants/constants';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schemas/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class IsUserExistMiddleware implements NestMiddleware {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async use(req, res, next) {
    const { username } = req.body;
    const candidate = await this.userModel.findOne({ username });
    if (candidate) {
      throw new BadRequestException({ message: userExist });
    }
    next();
  }
}
