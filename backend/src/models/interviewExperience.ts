// models/InterviewExperience.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface IInterviewExperience extends Document {
  companyName: string;
  jobRole: string;
  experienceLevel: 'intern' | '0-2 years' | '2-5 years' | '5-7 years' | '7-10 years' | '10+ years';
  techStack: string[];
  interviewQA: string;
  preparationSuggestions: string;
  tags: string[];
  contactDetails?: {
    linkedin?: string;
    email?: string;
  };
  dateOfInterview?: Date;
  location?: 'remote' | 'onsite' | 'hybrid';
  interviewRoundsCount?: number;
  interviewDifficulty?: 'easy' | 'medium' | 'hard';
  interviewMode?: 'online' | 'offline' | 'telephonic';
  wasOfferExtended?: boolean;
  ctcOrStipend?: string;
  anonymous?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  viewCount?: number;
}

const InterviewExperienceSchema: Schema = new Schema<IInterviewExperience>(
  {
    companyName: { type: String, required: true },
    jobRole: { type: String, required: true },
    experienceLevel: {
      type: String,
      enum: ['intern', '0-2 years', '2-5 years', '5-7 years', '7-10 years', '10+ years'],
      required: true,
    },
    techStack: { type: [String], required: true },
    interviewQA: { type: String, required: true },
    preparationSuggestions: { type: String, required: true },
    tags: { type: [String], default: [] },
    contactDetails: {
      linkedin: { type: String },
      email: { type: String },
    },
    dateOfInterview: { type: Date },
    location: {
      type: String,
      enum: ['remote', 'onsite', 'hybrid'],
    },
    interviewRoundsCount: { type: Number },
    interviewDifficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
    },
    interviewMode: {
      type: String,
      enum: ['online', 'offline', 'telephonic'],
    },
    wasOfferExtended: { type: Boolean },
    ctcOrStipend: { type: String },
    anonymous: { type: Boolean, default: false },
    viewCount:{type: Number , default : 0},
  },
  { timestamps: true }
);

export default mongoose.model<IInterviewExperience>('InterviewExperience', InterviewExperienceSchema,'interview_post');
