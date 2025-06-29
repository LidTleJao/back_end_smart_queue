// import express from "express";
// import { getAllBookings,createBooking, getTodayBookings } from "../controllers/booking.controller";

// export const router = express.Router();

// router.get("/queueAll", getAllBookings);
// router.get("/today", getTodayBookings);
// router.post("/", createBooking);

import express from "express";
import { createBooking, getBookings } from "../controllers/booking.controller";

export const router = express.Router();
router.get("/", getBookings);
router.post("/", (req, res, next) => {
  Promise.resolve(createBooking(req, res, next)).catch(next);
});

