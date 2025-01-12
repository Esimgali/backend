/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
export class User {
  @Prop({ required: true })
  firstName!: string;

  @Prop({ required: true })
  lastName!: string;

  @Prop({ required: true })
  email!: string;

  @Prop({ required: true })
  dob!: number;

  @Prop({ required: true })
  gender!: string;

  @Prop({ required: true })
  position!: string;

  @Prop()
  photo?: string;

  @Prop()
  note?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
