import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { clientError } from '../../constants/constants';
import { Notes, NotesDocument } from '../../schemas/note.schema';

@Injectable()
export class NotesGuard implements CanActivate {
  constructor(
    @InjectModel(Notes.name) private notesModel: Model<NotesDocument>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const userId = req.user.id;
    const note = await this.notesModel.findById(req.params.id);
    if (String(userId) !== String(note.userId)) {
      throw new BadRequestException({ message: clientError });
    }
    return true;
  }
}
