import { Router } from "express";
import { createInterview, getAllInterviews } from "../controllers/interview.controller";
import { validateInterviewData } from "../utils/validator";

const router = Router();

router.post("/", validateInterviewData, createInterview);
router.get("/", getAllInterviews);

export default router;
