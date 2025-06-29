// import express from "express";
// import {
//   getServices,
//   createServiceSmartQueue,
// } from "../controllers/service.comtroller";

// export const router = express.Router();

// router.get("/", getServices);
// router.post("/", (req, res, next) => {
//   Promise.resolve(createServiceSmartQueue(req, res)).catch(next);
// });

import { createService, getServices } from "../controllers/service.comtroller";
import express from "express";

export const router = express.Router();
router.get("/", getServices);
router.post("/", (req, res, next) => {
  Promise.resolve(createService(req, res)).catch(next);
});
