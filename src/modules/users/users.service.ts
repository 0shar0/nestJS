import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schemas/users.schema';
import { Model } from 'mongoose';
import { serverError, success } from '../../constants/constants';
import * as bcrypt from 'bcrypt';
import { Notes, NotesDocument } from '../../schemas/note.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Notes.name) private notesModel: Model<NotesDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  async getMe(id: number) {
    try {
      const user = await this.userModel.findById(id);
      return {
        user: {
          _id: user._id,
          username: user.username,
          createdDate: user.createdAt,
        },
      };
    } catch (e) {
      throw new InternalServerErrorException({ message: serverError });
    }
  }
  async updatePassword(password: string, id: number) {
    const hashPassword = await bcrypt.hash(password, 5);
    await this.userModel.findByIdAndUpdate(id, {
      password: hashPassword,
    });
    return { message: success };
  }
  async delete(id: number) {
    try {
      const user = await this.userModel.findById(id);
      await Promise.all(
        user.notes.map(
          async (note) => await this.notesModel.findByIdAndDelete(note),
        ),
      );
      await this.userModel.findByIdAndDelete(id);
      return {
        message: success,
      };
    } catch (e) {
      throw new InternalServerErrorException({ message: serverError });
    }
  }
}
