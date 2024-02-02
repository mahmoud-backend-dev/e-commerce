import slugify from "slugify";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import Brand from "../../../DB/models/brand.model.js";
import { deleteOne } from "../handler/handler.js";
import { ApiFeature } from "../../utils/ApiFeature.js";
import cloudinary from "../../services/fileUploads/cloudinary.js";

const addBrand = asyncHandler(async (req, res) => {

  if (!req.file)
  return next(new Error("category image is required", { cause: 400 }));
//upload img in cloudinary
const { public_id, secure_url } = await cloudinary.uploader.upload(
  req.file.path,
  { folder: `${process.env.CLOUD_FOLDER_NAME}/brand` }
);  
  let brand = new Brand({
    name: req.body.name,
    slug: slugify(req.body.name),
    createdBy: req.user._id,
    image: { id: public_id, url: secure_url },
  });

  await brand.save();

  res.status(201).json({ message: "Brand added successfuly", brand });
});

const getAllBrand = asyncHandler(async (req, res) => {
  let apiFeature = new ApiFeature(Brand.find({}) , req.query)
  .fields()
  .sort()
  .pagination()
  .filter()
  .search();
  const brand = await apiFeature.mongoQuery;
  res.status(200).json({ message: "All Brand", brand });
});

const OneBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  !brand && res.status(404).json({ message: "brand Not found" });
  brand && res.status(200).json({ message: "brand of this Id:", brand });
});

const updateBrand = asyncHandler(async (req, res,next) => {
  if (req.body.name) req.body.slug = slugify(req.body.name);
  // if (req.file) req.body.logo = req.file.filename;
  if (!req.file)
  return next(new Error("brand image is required", { cause: 400 }));
//upload img in cloudinary
const { public_id, secure_url } = await cloudinary.uploader.upload(
  req.file.path,
  { folder: `${process.env.CLOUD_FOLDER_NAME}/brand` }
); 
  const brand = await Brand.findByIdAndUpdate(req.params.id,  
    {
      name:req.body.name,
      slug:req.body.slug,
      logo:{ id:public_id, url:secure_url }
    },
    {new: true,});
  !brand && res.status(404).json({ message: "brand Not found" });
  brand && res.status(200).json({ message: "brand updated", brand });
});

const deleteBrand = deleteOne(Brand);

export { addBrand, getAllBrand, OneBrand, deleteBrand, updateBrand };
