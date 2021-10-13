import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Notes } from './note.schema';
import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;

@Schema({ timestamps: true })
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notes' }] })
  notes: Notes[];

  @Prop()
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
