import express from "express";
import locationRoutes from "./routes/location.js";
import distanceRoutes from "./routes/distance.js";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*", // allow all for development
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/location", locationRoutes);
app.use("/api/distance", distanceRoutes);

app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});

