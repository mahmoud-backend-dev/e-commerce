import mongoose from "mongoose";

const connectDB = async () => {
  return await mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("connected to DB"))
    .catch((err) => console.log("faild to connect to DB", err));
};
export default connectDB;
