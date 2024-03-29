import express from "express";
import connectDB from "./DB/dbConnection.js";
import { config } from "dotenv";
import init from "./src/modules/server.routes.js";

config({ path: "./config/dev.config.env" });

const app = express();
// DB Connection
await connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/uploads", express.static("uploads"));
// API routes
init(app);

// Page Not Found
app.use("*", (req, res, next) => {
  return next(new Error("Page Not Found", { cause: 404 }));
});



app.listen(process.env.PORT, () => {
  console.log(`running on port ${process.env.PORT}`); //port can be string or number
});
