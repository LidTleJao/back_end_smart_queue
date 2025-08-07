import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: "ไม่พบ token" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { adminId: string };
    console.log("✅ decoded token:", decoded);
    (req as any).adminId = decoded.adminId;
    next(); // ดำเนินการต่อ
  } catch (err) {
    res.status(401).json({ error: "Token ไม่ถูกต้อง" });
  }
};

// export const authMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader?.startsWith("Bearer ")) {
//     return res.status(401).json({ error: "ไม่พบ token" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET) as { adminId: string };
//     (req as any).adminId = decoded.adminId;
//     next();
//   } catch (err) {
//     return res.status(401).json({ error: "Token ไม่ถูกต้อง" });
//   }
// };
