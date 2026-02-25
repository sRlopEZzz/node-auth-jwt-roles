
import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import RegisterController from "../controllers/RegisterController.js";
const router = Router();

//login
router.post("/login", AuthController.login);

//reegister
router.post("register", RegisterController.register);


//validar email
router.get("/validar-email", RegisterController.validarEmail);

//
export default router;
