"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const interview_controller_1 = require("../controllers/interview.controller");
const validator_1 = require("../utils/validator");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.authenticateToken, validator_1.validateInterviewData, interview_controller_1.createInterview);
router.get("/", interview_controller_1.getAllInterviews);
router.get("/:id", interview_controller_1.getInterviewByIdAndIncrementViews);
router.get("/:id/viewCount", interview_controller_1.getViewCount);
exports.default = router;
//# sourceMappingURL=interview.routes.js.map