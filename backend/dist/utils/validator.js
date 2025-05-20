"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInterviewData = void 0;
const validateInterviewData = (req, res, next) => {
    const { companyName, jobRole, experienceLevel, techStack, interviewQA, preparationSuggestions, tags, contactDetails } = req.body;
    if (!companyName ||
        !jobRole ||
        !experienceLevel ||
        !techStack ||
        !interviewQA ||
        !preparationSuggestions ||
        !tags ||
        !contactDetails) {
        res.status(400).json({ error: "All fields are required." });
        return;
    }
    next();
};
exports.validateInterviewData = validateInterviewData;
//# sourceMappingURL=validator.js.map