// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import bodyParser from "body-parser";
// import { connectDB } from "./config/db";

// import { router as booking } from "./routes/Booking.routes";
// import { router as service } from "./routes/Service.routes";
// import { router as category } from "./routes/Category.routes";

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.text());

// app.use("/booking", booking);
// app.use("/service", service);
// app.use("/category", category);

// app.get("/", (_req, res) => {
//   res.send("✅ SmartQueue API is working!");
// });

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`🚀 Server running at http://localhost:${PORT}`);
//   });
// });

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./config/db";

// import routes
import { router as categoryRoutes } from "./routes/Category.routes";
import { router as serviceRoutes } from "./routes/Service.routes";
import { router as bookingRoutes } from "./routes/Booking.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.text());

// setup routes
app.use("/category", categoryRoutes);
app.use("/service", serviceRoutes);
app.use("/booking", bookingRoutes);

// test route
app.get("/", (_req, res) => {
  res.send("✅ SmartQueue API is running");
});

// connect DB & run server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
