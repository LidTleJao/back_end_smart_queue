import { NextFunction, Request, Response } from "express";
import Booking from "../models/Booking.models";
import ServiceModels from "../models/Service.models";
import CategoryModels from "../models/Category.models";

export const getBookings = async (_req: Request, res: Response) => {
  const bookings = await Booking.find()
    .populate("service")
    .populate("category");
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

  // แปลงวันนี้ให้อยู่ในรูปแบบ YYYY-MM-DD
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  const formattedToday = `${yyyy}-${mm}-${dd}`;

  try {
    const bookings = await Booking.find({ date: formattedToday })
      .populate("category")
      .populate("service");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "ดึงข้อมูลล้มเหลว" });
  }
};
