// import { Request, Response } from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import Admin from "../models/admin.model";

// const JWT_SECRET = process.env.JWT_SECRET || "secret";

// export const registerAdmin = async (
//   req: Request,
//   res: Response,
//   next: unknown
// ) => {
//   const { username, password } = req.body;

//   const existing = await Admin.findOne({ username });
//   if (existing) return res.status(400).json({ error: "มีผู้ใช้นี้แล้ว" });

//   const hashed = await bcrypt.hash(password, 10);
//   const admin = await Admin.create({ username, password: hashed });

//   res.status(201).json({ message: "สร้างแอดมินเรียบร้อย", adminId: admin._id });
// };

// export const loginAdmin = async (
//   req: Request,
//   res: Response,
//   next: unknown
// ) => {
//   const { username, password } = req.body;

//   const admin = await Admin.findOne({ username });
//   if (!admin) return res.status(401).json({ error: "ชื่อผู้ใช้ไม่ถูกต้อง" });

//   const isMatch = await bcrypt.compare(password, admin.password);
//   if (!isMatch) return res.status(401).json({ error: "รหัสผ่านไม่ถูกต้อง" });

//   const token = jwt.sign({ adminId: admin._id }, JWT_SECRET, {
//     expiresIn: "2h",
//   });
//   res.json({ message: "เข้าสู่ระบบสำเร็จ", token });
// };

// export const getAdminProfile = async (
//   req: Request,
//   res: Response,
//   next: unknown
// ) => {
//   const admin = await Admin.findById((req as any).adminId).select("-password");
//   res.json(admin);
// };


import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.model";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const registerAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;

    const existing = await Admin.findOne({ username });
    if (existing) {
      res.status(400).json({ error: "มีผู้ใช้นี้แล้ว" });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ username, password: hashed });

    res.status(201).json({
      message: "สร้างแอดมินเรียบร้อย",
      adminId: admin._id,
    });
  } catch (err) {
    next(err); // เผื่อให้ Express จัดการ error กลาง
  }
};

export const loginAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) {
      res.status(401).json({ error: "ชื่อผู้ใช้ไม่ถูกต้อง" });
      return;
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      res.status(401).json({ error: "รหัสผ่านไม่ถูกต้อง" });
      return;
    }

    const token = jwt.sign({ adminId: admin._id }, JWT_SECRET, {
      expiresIn: "2h",
    });

    res.json({ message: "เข้าสู่ระบบสำเร็จ", token });
  } catch (err) {
    next(err);
  }
};

export const getAdminProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const admin = await Admin.findById((req as any).adminId).select("-password");
    if (!admin) {
      res.status(404).json({ error: "ไม่พบผู้ดูแลระบบ" });
      return;
    }

    res.json(admin);
  } catch (err) {
    next(err);
  }
};
