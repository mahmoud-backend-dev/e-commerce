import multer, { diskStorage } from "multer";

// const fileUpload = () => {
//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "uploads/");
//     },
//     filename: (req, file, cb) => {
//       cb(null, new mongoose.Types.ObjectId() + "-" + file.originalname);
//     },
//   });

//   const filter = (req, file, cb) => {
//     if (file.mimetype.startsWith("image")) {
//       cb(null, true);
//     } else {
//       cb(next(new Error("sorry, only images", { cause: 401 })), false);
//     }
//   };
// };

const fileUpload = () => {
  const fileFilter = (req, file, cb) => {
    if (!["image/png", "image/jpeg"].includes(file.mimetype))
      return cb(next(new Error("only Image")), false);
    return cb(null, true);
  };
  return multer({ storage: diskStorage({}), fileFilter });
};
const uploadSingleFile = (fieldName) => fileUpload().single(fieldName);
const uploadArrayOfFiles = (fieldName) => fileUpload().array(fieldName, 10);
const uploadFiles = (fields) => fileUpload().array(fields);

export { uploadSingleFile, uploadArrayOfFiles, uploadFiles };
