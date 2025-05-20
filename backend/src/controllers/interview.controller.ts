import { Request, Response, NextFunction } from "express";
import Interview from "../models/interviewExperience";

export const createInterview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const interview = new Interview(req.body);
    const saved = await interview.save();
    res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
};

export const getAllInterviews = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const interviews = await Interview.find().sort({ createdAt: -1 });
    res.status(200).json(interviews);
  } catch (error) {
    next(error);
  }
};
