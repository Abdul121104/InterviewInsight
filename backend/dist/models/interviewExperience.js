"use strict";
// models/InterviewExperience.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const InterviewExperienceSchema = new mongoose_1.Schema({
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
    viewCount: { type: Number, default: 0 },
}, { timestamps: true });
exports.default = mongoose_1.default.model('InterviewExperience', InterviewExperienceSchema, 'interview_post');
//# sourceMappingURL=interviewExperience.js.map