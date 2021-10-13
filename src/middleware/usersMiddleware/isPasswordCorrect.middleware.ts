import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schemas/users.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { badPassword } from '../../constants/constants';

export class IsPasswordCorrectMiddleware implements NestMiddleware {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async use(req, res, next) {
    const { username, password } = req.body;
    const user = await this.userModel.findOne({ username });
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      throw new BadRequestException({ message: badPassword });
    }
    next();
  }
}
