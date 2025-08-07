import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "../models/Category.models";
import Service from "../models/Service.models";

dotenv.config();

const mongoUri = process.env.MONGO_URI || "";
if (!mongoUri) {
  console.error("❌ MONGO_URI is not set");
  process.exit(1);
}

const categoriesAndServices = {
  "ร้านเสริมสวย": ["ทำผม", "ทำเล็บ", "สปา", "นวดผ่อนคลาย"],
  "ฟิตเนส": ["คลาสออกกำลังกาย", "เทรนเนอร์ส่วนตัว", "โยคะ"],
  "ร้านซ่อมรถ": ["ตรวจเช็คสภาพ", "เปลี่ยนถ่ายน้ำมัน", "ซ่อมระบบต่างๆ", "เปลี่ยนยาง"],
  "คลินิก": ["ตรวจรักษาทั่วไป", "ทันตกรรม", "ความงาม", "กายภาพบำบัด"],
};

const seed = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB connected");

    await Category.deleteMany();
    await Service.deleteMany();

    for (const [categoryName, serviceNames] of Object.entries(categoriesAndServices)) {
      const category = await Category.create({ name: categoryName });

      const services = serviceNames.map((name) => ({
        name,
        category: category._id,
      }));

      await Service.insertMany(services);
      console.log(`✅ Created category "${categoryName}" with ${services.length} services`);
    }

    console.log("🎉 Seeding completed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seed();
