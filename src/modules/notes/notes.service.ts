import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Notes, NotesDocument } from '../../schemas/note.schema';
import { User, UserDocument } from '../../schemas/users.schema';
import { serverError, success } from '../../constants/constants';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Notes.name) private notesModel: Model<NotesDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  async getAllNotes(offset = 0, limit = 0, userId) {
    try {
      const user = await this.userModel.findById(userId);
      const notes = user.notes.slice(offset, limit ? limit + 1 : undefined);
      const fetchedNotes = await Promise.all(
        notes.map((note) => this.notesModel.findById(note)),
      );
      return {
        offset,
        limit,
        count: user.notes.length,
        notes: fetchedNotes.map((note) => {
          if (note) {
            const { _id, userId, completed, text, createdAt } = note;
            return { _id, userId, completed, text, createdDate: createdAt };
          }
        }),
      };
    } catch (e) {
      throw new InternalServerErrorException({ message: serverError });
    }
  }
  async addNewNote(text: string, id: number) {
    try {
      const user = await this.userModel.findById(id);
      const note = await this.notesModel.create({
        text,
        completed: false,
        userId: user._id,
      });
      user.notes.push(note._id);
      await user.save();
      return { message: success };
    } catch (e) {
      throw new InternalServerErrorException({ message: serverError });
    }
  }
  async getOne(id: number) {
    try {
      const { _id, userId, completed, text, createdAt } =
        await this.notesModel.findById(id);
      return {
        note: {
          _id,
          userId,
          completed,
          text,
          createdDate: createdAt,
        },
      };
    } catch (e) {
      throw new InternalServerErrorException({ message: serverError });
    }
  }
  async updateOne(id: number, text: string) {
    try {
      const note = await this.notesModel.findById(id);
      note.text = text;
      await note.save();
      return { message: success };
    } catch (e) {
      throw new InternalServerErrorException({ message: serverError });
    }
  }
  async checkOne(id: number) {
    try {
      const note = await this.notesModel.findById(id);
      note.completed = !note.completed;
      await note.save();
      return { message: success };
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException({ message: serverError });
    }
  }
  async deleteOne(id: number, userId: number) {
    try {
      await this.notesModel.findByIdAndDelete(id);
      await this.userModel.findByIdAndUpdate(userId, {
        $pull: { notes: { $in: [id] } },
      });
      return { message: success };
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException({ message: serverError });
    }
  }
}
