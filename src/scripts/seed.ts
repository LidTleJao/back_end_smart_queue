import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "../models/Category.models";
import Service from "../models/Service.models";

// 1. โหลด env และเชื่อม MongoDB
dotenv.config();
const MONGO_URI = process.env.MONGO_URI || "";

const servicesByCategory: Record<string, string[]> = {
  ร้านเสริมสวย: ["ทำผม", "ทำเล็บ", "สปา", "นวดผ่อนคลาย"],
  ฟิตเนส: ["คลาสออกกำลังกาย", "เทรนเนอร์ส่วนตัว", "โยคะ"],
  ร้านซ่อมรถ: [
    "ตรวจเช็คสภาพ",
    "เปลี่ยนถ่ายน้ำมัน",
    "ซ่อมระบบต่างๆ",
    "เปลี่ยนยาง",
  ],
  คลินิก: ["ตรวจรักษาทั่วไป", "ทันตกรรม", "ความงาม", "กายภาพบำบัด"],
};

const run = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // ลบข้อมูลเดิม (optional)
    await Category.deleteMany();
    await Service.deleteMany();

    // เพิ่มข้อมูล
    for (const [categoryName, serviceList] of Object.entries(
      servicesByCategory
    )) {
      const category = await Category.create({ name: categoryName });
      const services = serviceList.map((name) => ({
        name,
        category: category._id,
      }));
      await Service.insertMany(services);
      console.log(`Created ${services.length} services for "${categoryName}"`);
    }

    console.log(" Seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error(" Seeding failed:", err);
    process.exit(1);
  }
};

run();
