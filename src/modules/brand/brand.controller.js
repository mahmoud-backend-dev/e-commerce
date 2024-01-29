import slugify from "slugify";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import Brand from "../../../DB/models/brand.model.js";
import { deleteOne } from "../handler/handler.js";
import { ApiFeature } from "../../utils/ApiFeature.js";

const addBrand = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.name);
  req.body.logo = req.file.filename;
  let brand = new Brand(req.body);

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

const updateBrand = asyncHandler(async (req, res) => {
  if (req.body.name) req.body.slug = slugify(req.body.name);
  if (req.file) req.body.logo = req.file.filename;

  const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  !brand && res.status(404).json({ message: "brand Not found" });
  brand && res.status(200).json({ message: "brand updated", brand });
});

const deleteBrand = deleteOne(Brand);

export { addBrand, getAllBrand, OneBrand, deleteBrand, updateBrand };
