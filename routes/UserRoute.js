import { Router } from "express";

import { getAllUsers, updateUser, deleteUser, updateUserAddress } from "../controllers/UserController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getAllUsers);
router.put("/", updateUser);
router.delete("/", deleteUser);
router.put("/address", updateUserAddress);


export default router;