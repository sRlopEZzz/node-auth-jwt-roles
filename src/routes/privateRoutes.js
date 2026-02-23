
import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import auth from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/authRoleMiddleware.js";

const router = Router();

router.get("/admin/test", auth,authorizeRoles("admin"), (req, res) => {
    res.json({message: "Acesso permitido. Bem-vindo, admin.", user: req.user});
});

export default router;
