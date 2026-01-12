import express from "express";
import cookieParser from 'cookie-parser';
import locationRoutes from "./routes/location.js";
import distanceRoutes from "./routes/distance.js";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from './routes/AuthRoute.js';
import userRoutes from "./routes/UserRoute.js";
import foodRoutes from "./routes/FoodRoute.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "*", // allow all for development
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ekcupchai";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("MongoDB connection error:", err));

app.get("/api/health", (req, res) => {
  res.send(`<html>
    <body >
    <h3 style='color: blue;'>
    Welcome to ekcupchai server...
    </h3>
    <ul>
    <li><p style='color: green;'>Mongodb Connected <input type="checkbox" checked/></p></li>
    <li><p style='color: green;'>API Running <input type="checkbox" checked/></p></li>
    </ul>
    </body>
    </html>`);
});

app.use("/api/location", locationRoutes);
app.use("/api/distance", distanceRoutes);


app.use('/api/auth', authRoutes);
app.use ('/api/user', userRoutes);
app.use('/api/food', foodRoutes);
