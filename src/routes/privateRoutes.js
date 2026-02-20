
import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import auth from "../middlewares/auth.js";

const router = Router();
router.get("/admin/users", authMiddleware, AdminController.listarUsuarios)

export default router;
