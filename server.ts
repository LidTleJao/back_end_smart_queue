import http from "http";
import { app } from "./index";
import { connectDB } from "./config/db";

const port = process.env.port || 5000;
const server = http.createServer(app);

// server.listen(port, () =>{
//     console.log("Server is Open!!!");
// });
connectDB().then(() => {
  app.listen(port, () => {
    console.log(` Server running on http://localhost:${PORT}`);
  });
});