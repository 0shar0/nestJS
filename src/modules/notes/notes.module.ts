import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Notes, NotesSchema } from '../../schemas/note.schema';
import { AuthModule } from '../auth/auth.module';
import { User, UserSchema } from '../../schemas/users.schema';
import { IsNoteExistMiddleware } from '../../middleware/notesMiddleware/isNoteExist.middleware';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Notes.name, schema: NotesSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(IsNoteExistMiddleware)
      .forRoutes({ path: '/api/notes/:id', method: RequestMethod.ALL });
  }
}
