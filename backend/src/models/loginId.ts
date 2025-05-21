import mongoose, { Document, Schema, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface ILoginId extends Document {
  email: string;
  name?: string;
  postedInterviewIds: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
  googleId?: string;
  googleName?: string;
  username?: string;
  password?: string;
  isPasswordCorrect(candidatePassword: string): Promise<boolean>;
}

const LoginIdSchema: Schema = new Schema<ILoginId>(
  {
    email: { 
      type: String, 
      required: true, 
      unique: true,
      match: [/.+\@.+\..+/, 'Please enter a valid email'] 
    },
    name: { type: String },
    postedInterviewIds: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'InterviewExperience',
      default: [] 
    }],
    googleId: { 
      type: String, 
      unique: true, 
      sparse: true 
    },
    googleName: { type: String },
    username: { 
      type: String, 
      unique: true, 
      sparse: true 
    },
    password: { type: String },
  },
  { 
    timestamps: true,
  }
);

// Custom validation for at least one auth method
LoginIdSchema.pre('validate', function(next) {
  if (!this.googleId && !(this.username && this.password)) {
    this.invalidate('auth', 'User must have either Google OAuth or username/password.');
  }
  next();
});

// Hash password before saving
LoginIdSchema.pre('save', async function(next) {
  if (this.isModified('password') && this.password) {
    try {
      this.password = await bcrypt.hash(this.password as string, 10);
    } catch (err) {
      return next(err as Error);
    }
  }
  next();
});

// Method to check password
LoginIdSchema.methods.isPasswordCorrect = async function(candidatePassword: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<ILoginId>('LoginId', LoginIdSchema, 'user_logins');