import http from "http";
// import { app } from "./index";
// import { connectDB } from "./config/db";
import { app } from "../back_end_smart_queue_nodejs/src/index";
import { connectDB } from "../back_end_smart_queue_nodejs/src/config/db";

const port = process.env.port || 5000;
const server = http.createServer(app);

// server.listen(port, () =>{
//     console.log("Server is Open!!!");
// });
connectDB().then(() => {
  app.listen(port, () => {
    console.log(` Server running on http://localhost:${port}`);
  });
});