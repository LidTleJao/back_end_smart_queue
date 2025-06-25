
import { Request, Response } from "express";
import BookingModels from "../models/Booking.models";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const newBooking = new BookingModels(req.body);
    await newBooking.save();
    res.status(201).json({ message: "จองคิวสำเร็จ", booking: newBooking });
  } catch (err) {
    res.status(500).json({ error: "บันทึกข้อมูลไม่สำเร็จ" });
  }
};

export const getTodayBookings = async (req: Request, res: Response) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  try {
    const bookings = await BookingModels.find({
      datetime: { $gte: today, $lt: tomorrow },
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "ดึงข้อมูลล้มเหลว" });
  }
};
