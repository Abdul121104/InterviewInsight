import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import interviewRoutes from "./routes/interview.routes";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middlewares/errorHandler";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json()); // Parse incoming JSON
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/interviews", interviewRoutes);
app.use("/api/auth", authRoutes);

// Error handler middleware
app.use(errorHandler);

// Connect DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
