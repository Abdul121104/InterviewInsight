"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// import cors from "cors";
const db_1 = __importDefault(require("./config/db"));
const interview_routes_1 = __importDefault(require("./routes/interview.routes"));
// import errorHandler from "./middlewares/errorHandler";
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
// app.use(cors());
app.use(express_1.default.json()); // Parse incoming JSON
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use("/api/interviews", interview_routes_1.default);
// // Error handler middleware
// app.use(errorHandler);
// Connect DB and start server
(0, db_1.default)().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});
//# sourceMappingURL=server.js.map