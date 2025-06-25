import express from "express";
import { getServices } from "../controllers/service.comtroller";

const router = express.Router();

router.get("/", getServices);
// router.post("/", createService);

export default router;
