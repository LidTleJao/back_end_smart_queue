// import { Request, Response } from "express";
// import BookingModels from "../models/Booking.models";

// export const getAllBookings = async (req: Request, res: Response) => {
//   try {
//     const bookings = await BookingModels.find().populate("service");
//     res.json(bookings);
//   } catch (error) {
//     res.status(500).json({ error: "ดึงข้อมูลล้มเหลว" });
//   }
// };

// export const createBooking = async (req: Request, res: Response) => {
//   try {
//     const newBooking = new BookingModels(req.body);
//     await newBooking.save();
//     res.status(201).json({ message: "จองคิวสำเร็จ", booking: newBooking });
//   } catch (err) {
//     res.status(500).json({ error: "บันทึกข้อมูลไม่สำเร็จ" });
//   }
// };

// export const getTodayBookings = async (req: Request, res: Response) => {
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);
//   const tomorrow = new Date(today);
//   tomorrow.setDate(today.getDate() + 1);

//   try {
//     const bookings = await BookingModels.find({
//       datetime: { $gte: today, $lt: tomorrow },
//     });
//     res.json(bookings);
//   } catch (err) {
//     res.status(500).json({ error: "ดึงข้อมูลล้มเหลว" });
//   }
// };

import { Request, Response } from "express";
import Booking from "../models/Booking.models";
import Service from "../models/Service.models";

export const getBookings = async (_req: Request, res: Response) => {
  const bookings = await Booking.find().populate("service");
  res.json(bookings);
};

export const createBooking = async (
  req: Request,
  res: Response,
  next: unknown
) => {
  const { name, phone, email, service, bookingDate } = req.body;

  const serviceExists = await Service.findById(service);
  if (!serviceExists) return res.status(404).json({ error: "ไม่พบบริการ" });

  const booking = await Booking.create({
    name,
    phone,
    email,
    service,
    bookingDate,
  });
  res.status(201).json(booking);
};
