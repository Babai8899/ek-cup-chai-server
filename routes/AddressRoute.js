import { Router } from "express";

import { addAddress } from "../controllers/AddressController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";

const router = Router();

// router.use(authMiddleware);

router.post("/", addAddress);


export default router;