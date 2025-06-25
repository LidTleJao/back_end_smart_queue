import { Request, Response } from "express";
import Category from "../models/Category.models";

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "ดึงประเภทบริการไม่สำเร็จ" });
  }
};

// export const createCategorySmartQueue = async (req: Request, res: Response) => {
//   try {
//     const { name } = req.body;
//     const exists = await Category.findOne({ name });
//     if (exists)
//       return res.status(500).json({ error: "ชื่อประเภทนี้มีอยู่แล้ว" });

//     const newCategory = await Category.create({ name });
//     res.status(201).json(newCategory);
//   } catch (error) {
//     res.status(500).json({ error: "สร้างประเภทบริการล้มเหลว" });
//   }
// };

export const createCategorySmartQueue = async (req: Request, res: Response) => {
  try {
    // Your logic to create a category
    res.status(201).json({ message: 'Category created successfully' });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: 'Failed to create category' });
  }
};