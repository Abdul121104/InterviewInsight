import { Request, Response, NextFunction } from "express";

export const validateInterviewData = (req: Request, res: Response, next: NextFunction): void => {
  const {
    companyName,
    jobRole,
    experienceLevel,
    techStack,
    interviewQA,
    preparationSuggestions,
    tags,
    contactDetails
  } = req.body;

  if (
    !companyName ||
    !jobRole ||
    !experienceLevel ||
    !techStack ||
    !interviewQA ||
    !preparationSuggestions ||
    !tags ||
    !contactDetails
  ) {
    res.status(400).json({ error: "All fields are required." });
    return;
  }

  next();
};
