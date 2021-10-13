import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notes, NotesDocument } from '../../schemas/note.schema';
import { Model } from 'mongoose';
import { noNote } from '../../constants/constants';

export class IsNoteExistMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(Notes.name) private notesModel: Model<NotesDocument>,
  ) {}
  async use(req, res, next) {
    const { id } = req.params;
    const note = await this.notesModel.findById(id);
    if (!note) {
      throw new BadRequestException({ message: noNote });
    }
    next();
  }
}
