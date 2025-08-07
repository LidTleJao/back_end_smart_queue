import express from "express";
import { createBooking, getBookings, getTodayBookings } from "../controllers/booking.controller";

export const router = express.Router();
router.get("/", getBookings);
router.get("/today", getTodayBookings);
router.post("/request_booking", createBooking);

