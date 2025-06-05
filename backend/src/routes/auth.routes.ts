import { Router } from "express";
import { signup, login, checkUsers, handleGoogleCallback } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/check-users", checkUsers);
router.post("/google/callback", handleGoogleCallback);

export default router; 