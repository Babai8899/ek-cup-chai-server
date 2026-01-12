import { Router } from "express";

import { getAllUsers, updateUser, deleteUser } from "../controllers/UserController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getAllUsers);
router.put("/", updateUser);
router.delete("/", deleteUser);


export default router;