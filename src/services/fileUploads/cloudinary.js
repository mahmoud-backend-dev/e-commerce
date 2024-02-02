import   {v2 as cloudinary} from "cloudinary";
import dotenv from 'dotenv'
dotenv.config({ path: "./config/dev.config.env" });

// const cloudinaryConnection = () => {
//   cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET,
//   });
//   return cloudinary.v2;
// };

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
export default cloudinary;
