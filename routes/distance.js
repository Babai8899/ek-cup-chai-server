// routes/distance.js
import express from "express";
import { RESTAURANT_LOCATION } from "../config/restaurantLocation.js";
import { calculateDistance } from "../utils/calculateDistance.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { lat, lng } = req.body;

  if (!lat || !lng) {
    return res.status(400).json({ message: "User location missing" });
  }

  const distance = calculateDistance(
    lat,
    lng,
    RESTAURANT_LOCATION.lat,
    RESTAURANT_LOCATION.lng
  );

  res.json({
    restaurant: RESTAURANT_LOCATION,
    distanceKm: distance.toFixed(2),
    deliveryAvailable: distance <= 5, // 5km radius
  });
});

export default router;
