import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import interviewRoutes from "./routes/interview.routes";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middlewares/errorHandler";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "https://interview-frontend-tedn.onrender.com",
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/interviews", interviewRoutes);
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
