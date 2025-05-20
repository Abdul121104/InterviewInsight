import { Request, Response, NextFunction } from "express";
import Interview from "../models/interviewExperience";
import Login from "../models/loginId"
// Get one interview by ID and increment viewCount
export const getInterviewByIdAndIncrementViews = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id } = req.params;

    const interview = await Interview.findByIdAndUpdate(
      id,
      { $inc: { viewCount: 1 } },
      { new: true }
    );

    if (!interview) {
      return res.status(404).json({ error: "Interview not found" });
    }

    res.status(200).json(interview);
  } catch (error) {
    next(error);
  }
};

// Optional: Get only viewCount
export const getViewCount = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id } = req.params;
    const interview = await Interview.findById(id).select("viewCount");

    if (!interview) {
      return res.status(404).json({ error: "Interview not found" });
    }

    res.status(200).json({ viewCount: interview.viewCount });
  } catch (error) {
    next(error);
  }
};

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