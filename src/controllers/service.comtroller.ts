// import { Request, Response } from "express";
// import Service from "../models/Service.models";
// import Category from "../models/Category.models";

// export const getServices = async (_req: Request, res: Response) => {
//   try {
//     const services = await Service.find().populate("category");
//     res.json(services);
//   } catch (err) {
//     res.status(500).json({ error: "ดึงบริการไม่สำเร็จ" });
//   }
// };

// export const createServiceSmartQueue = async (req: Request, res: Response) => {
//   try {
//     // Your logic to create a service
//     const { name, categoryId } = req.body;

//     const category = await Category.findById(categoryId);
//     if (!category) {
//       return res.status(404).json({ error: "ไม่พบหมวดหมู่" });
//     }

//     const newService = await Service.create({
//       name,
//       category: categoryId,
//     });
//     res.status(201).json(newService);
//   } catch (error) {
//     console.error("Error creating service:", error);
//     res.status(500).json({ error: 'Failed to create service' });
//   }
// };

import { Request, Response } from "express";
import Service from "../models/Service.models";
import Category from "../models/Category.models";

export const getServices = async (_req: Request, res: Response) => {
  const services = await Service.find().populate("category");
  res.json(services);
};

export const createService = async (req: Request, res: Response) => {
  // const { name, categoryId } = req.body;
  // const category = await Category.findById(categoryId);
  // if (!category) return res.status(404).json({ error: "ไม่พบประเภทบริการ" });

  // const service = await Service.create({ name, category: categoryId });
  // res.status(201).json(service);
  try {
    // Your logic to create a service
    const { name, categoryId } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "ไม่พบหมวดหมู่" });
    }

    const newService = await Service.create({
      name,
      category: categoryId,
    });
    res.status(201).json(newService);
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ error: "Failed to create service" });
  }
};
