import express from "express";
import { getCategories, createCategorySmartQueue } from "../controllers/category.controller";

const router = express.Router();

router.get("/", getCategories);
router.post("/", createCategorySmartQueue);

export default router;