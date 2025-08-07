import { Request, Response } from "express";
import Category from "../models/Category.models";

export const getCategories = async (_req: Request, res: Response) => {
  const categories = await Category.find();
  res.json(categories);
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const exists = await Category.findOne({ name });
    if (exists) {
      return res.status(400).json({ error: "ชื่อประเภทนี้มีอยู่แล้ว" });
    }

    const newCategory = await Category.create({ name });
    return res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    return res.status(500).json({ error: "สร้างประเภทบริการล้มเหลว" });
  }
};
