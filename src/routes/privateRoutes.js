
import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.get("/me", auth, AuthController.me);

export default router;
