import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { bookingRoutes } from "./routes/booking";
import { connectDB } from "./config/db";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/bookings", bookingRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
  });
});
