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
exports.login = exports.signup = exports.checkUsers = void 0;
const loginId_1 = __importDefault(require("../models/loginId"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Debug route to check existing users
const checkUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield loginId_1.default.find({}, { password: 0 });
        console.log('All users in database:', users);
        res.status(200).json({ users });
    }
    catch (error) {
        console.error('Error checking users:', error);
        res.status(500).json({ error: "Error checking users" });
    }
});
exports.checkUsers = checkUsers;
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username, password, name, googleId, googleName } = req.body;
        const emailLower = email.toLowerCase().trim();
        // console.log('Attempting signup with:', { email: emailLower, username, googleId });
        const existingUsers = yield loginId_1.default.find({
            $or: [
                { email: { $regex: new RegExp(`^${emailLower}$`, 'i') } },
                ...(username ? [{ username }] : []),
                ...(googleId ? [{ googleId }] : [])
            ]
        });
        // console.log('All matching users found:', existingUsers);
        if (existingUsers.length > 0) {
            const emailConflict = existingUsers.some(u => u.email.toLowerCase() === emailLower);
            const usernameConflict = username && existingUsers.some(u => u.username === username);
            const googleConflict = googleId && existingUsers.some(u => u.googleId === googleId);
            if (emailConflict) {
                res.status(400).json({
                    error: "User already exists",
                    details: "Email already registered"
                });
            }
            else if (usernameConflict) {
                res.status(400).json({
                    error: "User already exists",
                    details: "Username already taken"
                });
            }
            else if (googleConflict) {
                res.status(400).json({
                    error: "User already exists",
                    details: "Google account already registered"
                });
            }
            return;
        }
        // Create new user
        const user = new loginId_1.default({
            email: emailLower,
            username,
            password,
            name,
            googleId,
            googleName
        });
        yield user.save();
        res.status(201).json({
            success: true,
            user: {
                id: user._id,
                email: user.email,
                name: user.name || user.username || user.googleName
            }
        });
    }
    catch (error) {
        console.error('Signup error:', error);
        next(error);
    }
});
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, googleId } = req.body;
        if (googleId) {
            const user = yield loginId_1.default.findOne({ googleId });
            if (!user) {
                res.status(401).json({ error: "Google account not found" });
                return;
            }
            const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
            res.status(200).json({
                success: true,
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name || user.googleName
                },
                token
            });
            return;
        }
        if (!username || !password) {
            res.status(400).json({ error: "Username and password are required" });
            return;
        }
        const user = yield loginId_1.default.findOne({ username });
        if (!user) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        const isMatch = yield user.isPasswordCorrect(password);
        if (!isMatch) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                email: user.email,
                name: user.name || user.username
            },
            token
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
//# sourceMappingURL=auth.controller.js.map