
import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import RegisterController from "../controllers/RegisterController.js";
const router = Router();

router.post("/login", AuthController.login);
router.get("/validar-email", RegisterController.validarEmail);

export default router;
