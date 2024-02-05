import slugify from "slugify";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import Brand from "../../../DB/models/brand.model.js";
import { deleteOne } from "../handler/handler.js";
import { ApiFeature } from "../../utils/ApiFeature.js";
import cloudinary from "../../services/fileUploads/cloudinary.js";
import Category from "../../../DB/models/category.model.js";

const addBrand = asyncHandler(async (req, res, next) => {
  const { categories, name } = req.body;
  // check categories [ {electronic},{food},{clothes}] array of objectIds
  const category = await Category.findById(categories);
  !category &&
    next(
      new Error(`category with this ID:  ${categories} Not found`, {
        cause: 404,
      })
    );

  // categories.forEach(async (categoryId) => {
  //   const category = await Category.findById(categoryId);
  //   !category &&
  //     next(
  //       new Error(`category with this ID:  ${categoryId} Not found`, {
  //         cause: 404,
  //       })
  //     );
  // });

  if (!req.file)
    return next(new Error("brand image is required", { cause: 400 }));
  //upload img in cloudinary
  const { public_id, secure_url } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `${process.env.CLOUD_FOLDER_NAME}/brand` }
  );
  const brand = await Brand.create({
    name: name,
    slug: slugify(name),
    createdBy: req.user._id,
    logo: { id: public_id, url: secure_url },
  });
  // categories.forEach(async (categoryId) => {
  //   await Category.findByIdAndUpdate(categoryId, {
  //     $push: { brands: brand._id },
  //   });
  // });

  // update categories
  await Category.findByIdAndUpdate(categories, {
    $push: { brands: brand._id },
  });

  res.status(201).json({ message: "Brand added successfuly", brand });
});

const getAllBrand = asyncHandler(async (req, res) => {
  let apiFeature = new ApiFeature(Brand.find({}), req.query)
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

const updateBrand = asyncHandler(async (req, res, next) => {
  // check brand exisit
  const brand = await Brand.findById(req.params.id);
  !brand && next(new Error("brand not found", { cause: 404 }));

  if (req.file) {
    //update img in cloudinary
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      brand.logo.id
    );
    brand.logo = { id: public_id, url: secure_url };
  }
  brand.name = req.body.name ? req.body.name : brand.name;
  brand.slug = req.body.name ? slugify(req.body.name) : brand.slug;

  await brand.save();
  brand && res.status(200).json({ message: "brand updated", brand });
});

const deleteBrand = asyncHandler(async (req, res, next) => {
  // check brand
  // delete brand if exisit
  const brand = await Brand.findByIdAndDelete(req.params.id);
  !brand && next(new Error("brand not found", { cause: 404 }));
  // delete logo
  await cloudinary.uploader.destroy(brand.logo.id);
  // delete categoreies from Categort Model
  await Category.updateMany({}, { $pull: { brands: brand._id } });
  // send res
  brand &&
    res.status(200).json({ message: "delete brand successfully:", brand });
});

export { addBrand, getAllBrand, OneBrand, deleteBrand, updateBrand };
