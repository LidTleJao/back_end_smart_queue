import { NextFunction, Request, Response } from "express";
import Booking from "../models/Booking.models";
import ServiceModels from "../models/Service.models";
import CategoryModels from "../models/Category.models";

export const getBookings = async (_req: Request, res: Response) => {
  const bookings = await Booking.find().populate("service");
  res.json(bookings);
};

export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, category, service, date, time, phone } = req.body;

    // ตรวจสอบว่ามี category/service ใน DB ไหม
    const categoryObj = await CategoryModels.findOne({ name: category });
    const serviceObj = await ServiceModels.findOne({ name: service });

    if (!categoryObj || !serviceObj) {
      res.status(400).json({ error: "ไม่พบประเภทหรือบริการที่เลือก" });
      return;
    }

    const newBooking = await Booking.create({
      name,
      category: categoryObj._id,
      service: serviceObj._id,
      date,
      time,
      phone,
    });

    res.status(201).json({ message: "จองคิวสำเร็จ", booking: newBooking });
  } catch (error) {
    next(error);
  }
};

export const getTodayBookings = async (req: Request, res: Response) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  try {
    const bookings = await Booking.find({
      datetime: { $gte: today, $lt: tomorrow },
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "ดึงข้อมูลล้มเหลว" });
  }
};
