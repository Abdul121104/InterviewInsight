import { Router } from "express";
import { signup, login, checkUsers } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/check-users", checkUsers);

export default router; 