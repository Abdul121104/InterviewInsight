"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllInterviews = exports.createInterview = void 0;
const interviewExperience_1 = __importDefault(require("../models/interviewExperience"));
const createInterview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const interview = new interviewExperience_1.default(req.body);
        const saved = yield interview.save();
        res.status(201).json(saved);
    }
    catch (error) {
        next(error);
    }
});
exports.createInterview = createInterview;
const getAllInterviews = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const interviews = yield interviewExperience_1.default.find().sort({ createdAt: -1 });
        res.status(200).json(interviews);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllInterviews = getAllInterviews;
//# sourceMappingURL=interview.controller.js.map