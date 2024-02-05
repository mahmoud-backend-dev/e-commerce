import slugify from "slugify";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import Product from "../../../DB/models/product.model.js";
import { deleteOne } from "../handler/handler.js";
import { ApiFeature } from "../../utils/ApiFeature.js";
import Category from "../../../DB/models/category.model.js";
import SubCategory from "../../../DB/models/subCategory.model.js";

import Brand from "../../../DB/models/brand.model.js";
import { nanoid } from "nanoid";
import cloudinary from "../../services/fileUploads/cloudinary.js";

const addProduct = asyncHandler(async (req, res, next) => {
  const { categoryId, subcategoryId, brandId, title, description, price } =
    req.body;
  // check category
  const category = await Category.findById(req.body.categoryId);
  !category && next(new Error("category not found", { cause: 404 }));
  // check subcategory
  const subCategory = await SubCategory.findById(req.body.subcategoryId);
  !subCategory && next(new Error("subCategory not found", { cause: 404 }));
  // check brands
  const brand = await Brand.findById(req.body.brandId);
  !brand && next(new Error("brand not found", { cause: 404 }));
  // check files
  if (!req.files)
    return next(new Error("please add imgs for your product", { cause: 400 }));
  // create unique folder name for each product
  const cloudFolder = nanoid();
  // upload images
  let imgs = [];
  for (const file of req.files.images) {
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      file.path,
      {
        folder: `${process.env.CLOUD_FOLDER_NAME}/product/${cloudFolder}`,
      }
    );
    imgs.push({ id: public_id, url: secure_url });
  }
  // upload imgCover
  const { public_id, secure_url } = await cloudinary.uploader.upload(
    req.files.imgCover[0].path,
    {
      folder: `${process.env.CLOUD_FOLDER_NAME}/product/${cloudFolder}`,
    }
  );
  //creatr product
  const product = await Product.create({
    ...req.body,
    cloudFolder,
    createdBy: req.user._id,
    slug: slugify(req.body.title),
    images: imgs,
    imgCover: { id: public_id, url: secure_url },
  });
  // req.body.slug = slugify(req.body.title);

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

const deleteProduct = asyncHandler(async (req, res, next) => {
  // check Product
  const product = await Product.findById(req.params.id);
  !product && res.status(404).json({ message: "product Not found" });
  // check owner
  if (req.user._id.toString() != product.createdBy.toString())
    return next(new Error("you are not authorized", { cause: 401 }));

  // delete product
  await product.deleteOne();

  res.status(200).json({ message: "product deleted", product });
});

export { addProduct, getAllProduct, OneProduct, deleteProduct, updateProduct };
