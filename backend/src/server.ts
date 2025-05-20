import express from "express";
import dotenv from "dotenv";
// import cors from "cors";
import connectDB from "./config/db";
import interviewRoutes from "./routes/interview.routes";
// import errorHandler from "./middlewares/errorHandler";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// app.use(cors());
app.use(express.json()); // Parse incoming JSON
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/interviews", interviewRoutes);

// // Error handler middleware
// app.use(errorHandler);

// Connect DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
