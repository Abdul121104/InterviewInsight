"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const interview_controller_1 = require("../controllers/interview.controller");
const validator_1 = require("../utils/validator");
const router = (0, express_1.Router)();
router.post("/", validator_1.validateInterviewData, interview_controller_1.createInterview);
router.get("/", interview_controller_1.getAllInterviews);
exports.default = router;
//# sourceMappingURL=interview.routes.js.map