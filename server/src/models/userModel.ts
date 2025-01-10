import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minLength: [1, 'Username must be at least 1 character'],
      maxLength: [128, 'Username must be at most 128 characters'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      trim: true,
      minLength: [8, 'Password must be at least 8 characters'],
      maxLength: [128, 'Password must be at most 128 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      email: [true, 'Email is invalid'],
      minLength: [5, 'Email must be at least 5 characters'],
      maxLength: [254, 'Email must be at most 254 characters'],
    },
    avatar: {
      type: String,
      default: '/img/avatars/default.png',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    listings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing',
      },
    ],
    firstName: {
      type: String,
      trim: true,
      minLength: [1, 'First name must be at least 1 character'],
      maxLength: [128, 'First name must be at most 128 characters'],
    },
    lastName: {
      type: String,
      trim: true,
      minLength: [1, 'Last name must be at least 1 character'],
      maxLength: [128, 'Last name must be at most 128 characters'],
    },
    companyName: {
      type: String,
      trim: true,
      minLength: [1, 'Company name must be at least 1 character'],
      maxLength: [128, 'Company name must be at most 128 characters'],
    },
    companyAddress: {
      type: String,
      trim: true,
      minLength: [1, 'Company address must be at least 1 character'],
      maxLength: [256, 'Company address must be at most 256 characters'],
    },
    telephone: {
      type: String,
      trim: true,
      minLength: [1, 'Telephone must be at least 1 character'],
      maxLength: [64, 'Telephone must be at most 32 characters'],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.index({ username: 1 }, { unique: true });

userSchema.index({ email: 1 }, { unique: true });

export const userModel = mongoose.model('User', userSchema);
