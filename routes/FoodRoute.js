import { Router } from "express";

import { addFood, getFoods, getFoodByName, getFoodByCategory, getFoodById, getFoodByType, updateFood, deleteFood } from "../controllers/FoodController.js";

import authMiddleware from "../middleware/AuthMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/", addFood);
router.get("/", getFoods);
router.get("/name/:name", getFoodByName);
router.get("/category/:category", getFoodByCategory);
router.get("/type/:type", getFoodByType);
router.get("/:id", getFoodById);
router.put("/:id", updateFood);
router.delete("/:id", deleteFood);

export default router;