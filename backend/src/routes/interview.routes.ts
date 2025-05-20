import { Router } from "express";
import { createInterview, getAllInterviews,getInterviewByIdAndIncrementViews,
  getViewCount,} from "../controllers/interview.controller";
import { validateInterviewData } from "../utils/validator";
const router = Router();

router.post("/", validateInterviewData, createInterview);
router.get("/", getAllInterviews);
router.get("/:id", getInterviewByIdAndIncrementViews);         // Increment & get interview
router.get("/:id/viewCount", getViewCount);                    // Just get view count

export default router;
