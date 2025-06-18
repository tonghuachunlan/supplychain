import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isEnterprise: boolean;
  membership?: Types.ObjectId;
  learningProgress?: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isEnterprise: {
      type: Boolean,
      default: false,
    },
    membership: {
      type: Schema.Types.ObjectId,
      ref: 'Membership',
    },
    learningProgress: [
      {
        type: Schema.Types.ObjectId,
        ref: 'LearningProgress',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>('User', userSchema); 