import slugify from "slugify";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import SubCategory from "../../../DB/models/subCategory.model.js";
import { deleteOne } from "../handler/handler.js";
import cloudinaryConnection from "../../services/fileUploads/cloudinary.js";

const addSubCategory = asyncHandler(async (req, res, next) => {
  // get data
  // image
  if (!req.file)
    return next(new Error("SubCategory image is required", { cause: 400 }));
  const { public_id, secure_url } = await cloudinaryConnection.uploader.upload(
    req.file.path,
    { folder: `${process.env.CLOUD_FOLDER_NAME}/subcategory` }
  );
  // check if exisit or not by name
  const isExisit = await SubCategory.findOne({ name });
  isExisit && next(new Error("SubCategory already exisit", { cause: 409 }));
  // create SubCategory
  const subCategory = await SubCategory.create({
    name: req.body.name,
    slug:slugify(req.body.name),
    createdBy: req.user._id,
    categoryId: req.params.category,
    image: { id: public_id, url: secure_url },
  });

  res.status(201).json({ message: "subCategory added successfuly" ,subCategory});
});

const allSubCategories = asyncHandler(async (req, res) => {
  let filterObj = {};
  if (req.params.category) {
    filterObj.categoryId = req.params.category;
  }
  let apiFeature = new ApiFeature(SubCategory.find(filterObj), req.query)
    .fields()
    // .sort()
    // .pagination()
    .filter()
    .search(); // filtrobj.categroyId.tostring()
  let subCategories = apiFeature.mongoQuery.populate(
    JSON.stringify(filterObj.categoryId)
  );
  // let subCategories = await SubCategory.find(filterObj).populate("category");
  res.status(200).json({ message: "All SubCategory", subCategories });
}); // api feature with merge param

const OneSubCategory = asyncHandler(async (req, res) => {
  const subCategory = await SubCategory.findById(req.params.id);
  !subCategory && res.status(404).json({ message: "SubCategory Not found" });
  subCategory &&
    res.status(200).json({ message: "SubCategory of this Id:", SubCategory });
});

const updateSubCategory = asyncHandler(async (req, res) => {
  if (req.body.name) req.body.slug = slugify(req.body.name);

  const subCategory = await SubCategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  !subCategory && res.status(404).json({ message: "subCategory Not found" });
  subCategory &&
    res.status(200).json({ message: "subCategory updated", SubCategory });
});

const deleteSubCategory = deleteOne(SubCategory);

export {
  addSubCategory,
  allSubCategories,
  OneSubCategory,
  deleteSubCategory,
  updateSubCategory,
};
