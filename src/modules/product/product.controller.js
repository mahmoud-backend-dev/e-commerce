import slugify from "slugify";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import Product from "../../../DB/models/product.model.js";
import { deleteOne } from "../handler/handler.js";
import { ApiFeature } from "../../utils/ApiFeature.js";
import Category from "../../../DB/models/category.model.js";
import SubCategory from "../../../DB/models/subCategory.model.js";
import Brand from "../../../DB/models/brand.model.js";

const addProduct = asyncHandler(async (req, res, next) => {
  const { categoryId, subcategoryId, brandId } = req.body;
  // check category
  const category = await Category.findById(categoryId);
  !category && next(new Error("category not found", { cause: 404 }));
  // check subcategory
  const subCategory = await SubCategory.findById(subcategoryId);
  !subCategory && next(new Error("subCategory not found", { cause: 404 }));
  // check brands
  const brand = await Brandd.findById(brandId);
  !brand && next(new Error("brand not found", { cause: 404 }));
  // check files
  if(!req.files) return  next(new Error("please add imgs for your product", { cause: 400 }));
  // create folder name
  const folder = 
  // upload imgCover
  // upload images
  //
  req.body.slug = slugify(req.body.title);
  req.body.imgCover = req.files.imgCover[0].filename;
  req.body.images = req.files.images.map((img) => img.filename);
  let product = new Product(req.body);

  await product.save();

  res.status(201).json({ message: "Product added successfuly", product });
});

const getAllProduct = asyncHandler(async (req, res) => {
  let apiFeature = new ApiFeature(Product.find(), req.query)
    .fields()
    .sort()
    .pagination()
    .filter()
    .search();
  const product = await apiFeature.mongoQuery;
  res.status(200).json({ message: "All Product", product });
});

const OneProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  !product && res.status(404).json({ message: "product Not found" });
  product && res.status(200).json({ message: "product of this Id:", product });
});

const updateProduct = asyncHandler(async (req, res) => {
  if (req.body.name) req.body.slug = slugify(req.body.title);
  if (req.files.imgCover) req.body.imgCover = req.files.imgCover[0].filename;
  if (req.files.images)
    req.body.images = req.files.images.map((img) => img.filename);

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  !product && res.status(404).json({ message: "product Not found" });
  product && res.status(200).json({ message: "product updated", product });
});

const deleteProduct = deleteOne(Product);

export { addProduct, getAllProduct, OneProduct, deleteProduct, updateProduct };
