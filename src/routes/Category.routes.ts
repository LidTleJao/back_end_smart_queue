// import express from "express";
// import {
//   getCategories,
//   createCategorySmartQueue,
// } from "../controllers/category.controller";

// export const router = express.Router();

// router.get("/", getCategories);
// router.post("/", (req, res, next) => {
//   Promise.resolve(createCategorySmartQueue(req, res)).catch(next);
// });

import express from "express";
import { createCategory, getCategories } from "../controllers/category.controller";

export const router = express.Router();
router.get("/", getCategories);
router.post("/", (req, res, next) => {
  Promise.resolve(createCategory(req, res)).catch(next);
});

