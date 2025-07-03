import express from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import {
  deleteBooking,
  getAllBookings,
  updateBooking,
} from "../controllers/admin/adminBooking.controller";

export const router = express.Router();

router.get("/bookings", authMiddleware, getAllBookings);
router.delete("/bookings/:id", authMiddleware, deleteBooking);
router.put("/bookings/:id", authMiddleware, updateBooking);
