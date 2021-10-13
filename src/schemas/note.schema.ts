import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './users.schema';
import * as mongoose from 'mongoose';

export type NotesDocument = Notes & mongoose.Document;

@Schema({ timestamps: true })
export class Notes {
  @Prop()
  id: number;

  @Prop()
  text: string;

  @Prop()
  completed: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop()
  createdAt: Date;
}

export const NotesSchema = SchemaFactory.createForClass(Notes);
