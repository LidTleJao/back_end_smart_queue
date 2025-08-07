import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./config/db";

// import routes
import { router as categoryRoutes } from "./routes/Category.routes";
import { router as serviceRoutes } from "./routes/Service.routes";
import { router as bookingRoutes } from "./routes/Booking.routes";
import { router as adminRoutes } from "./routes/admin.routes";
import { router as adminBookingRoutes } from "./routes/adminBooking.routes";

dotenv.config();

export const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.text());

// setup routes
app.use("/admin", adminRoutes);
app.use("/admin", adminBookingRoutes);
app.use("/category", categoryRoutes);
app.use("/service", serviceRoutes);
app.use("/booking", bookingRoutes);

// test route
app.get("/", (_req, res) => {
  res.send("✅ SmartQueue API is running");
});

// connect DB & run server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
