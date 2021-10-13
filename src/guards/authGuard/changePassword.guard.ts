import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { matchPassword } from '../../constants/constants';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schemas/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class ChangePasswordGuard implements CanActivate {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const { id } = req.user;
    const user = await this.userModel.findById(id);
    if (!bcrypt.compareSync(req.body.oldPassword, user.password)) {
      throw new BadRequestException({ message: matchPassword });
    }
    return true;
  }
}
