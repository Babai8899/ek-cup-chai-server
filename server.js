import express from "express";
import locationRoutes from "./routes/location.js";
import distanceRoutes from "./routes/distance.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*", // allow all for development
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/api/health", (req, res) => {
  res.send("Welcome to Ek Cup Chai Backend. API is running fine...");
});

app.use("/api/location", locationRoutes);
app.use("/api/distance", distanceRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

