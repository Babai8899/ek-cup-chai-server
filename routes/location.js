// routes/location.js
import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  const { lat, lng } = req.body;

  if (!lat || !lng) {
    return res.status(400).json({ message: "Location missing" });
  }

  console.log("User Location:", lat, lng);

  res.json({ success: true });
});

export default router;
