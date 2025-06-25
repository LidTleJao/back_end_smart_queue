import express from "express";
import { createBooking, getTodayBookings } from "../controllers/booking.controller";

const router = express.Router();

router.post("/", createBooking);
router.get("/today", getTodayBookings);

export default router;