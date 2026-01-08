import { Router } from "express";

import { login, register, getUser } from "../controllers/AuthController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/", login);

router.use(authMiddleware);

router.get("/", getUser);

export default router;