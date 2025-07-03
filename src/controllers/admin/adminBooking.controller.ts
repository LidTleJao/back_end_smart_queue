import { Request, Response, NextFunction } from "express";
import BookingModels from "../../models/Booking.models";

export const getAllBookings = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookings = await BookingModels.find()
      .populate("category", "name")
      .populate("service", "name")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "ไม่สามารถดึงข้อมูลการจองได้" });
    next(err);
  }
};

export const deleteBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleted = await BookingModels.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: "ไม่พบการจองนี้" });
      return;
    }
    res.json({ message: "ลบการจองเรียบร้อย" });
  } catch (err) {
    res.status(500).json({ error: "ไม่สามารถลบการจองได้" });
    next(err);
  }
};

export const updateBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updated = await BookingModels.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      res.status(404).json({ error: "ไม่พบการจองนี้" });
      return;
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "ไม่สามารถแก้ไขการจองได้" });
    next(err);
  }
};
