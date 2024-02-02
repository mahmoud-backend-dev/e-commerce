import Category from "../../../DB/models/category.model.js";
import slugify from "slugify";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { deleteOne } from "../handler/handler.js";
import { ApiFeature } from "../../utils/ApiFeature.js";
import cloudinaryConnection from "../../services/fileUploads/cloudinary.js";
const addCategory = asyncHandler(async (req, res, next) => {
  // req.body.slug = slugify(req.body.name);
  //check file
  if (!req.file)
    return next(new Error("category image is required", { cause: 400 }));
  //upload img in cloudinary
  const { public_id, secure_url } = await cloudinaryConnection.uploader.upload(
    req.file.path,
    { folder: `${process.env.CLOUD_FOLDER_NAME}/category` }
  );
  // req.body.image = req.file.filename;
  const category = await Category.create({
    name: req.body.name,
    slug: slugify(req.body.name),
    createdBy: req.user._id,
    image: { id: public_id, url: secure_url },
  });

  res.status(201).json({ message: "category added successfuly", category });
});

const allCategories = asyncHandler(async (req, res) => {
  let apiFeature = new ApiFeature( Category.find({}), req.query)
    .fields()
    .sort()
    .pagination()
    .filter()
    .search();
  const categories = await apiFeature.mongoQuery;
  res.status(200).json({ message: "All Categories", categories });
});

const OneCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  !category && res.status(404).json({ message: "Category Not found" });
  category &&
    res.status(200).json({ message: "Category of this Id:", category });
});

const updateCategory = asyncHandler(async (req, res, next) => {
  //check category in db
  const isExisit = await Category.findOne({ name: req.body.name });
  !isExisit && next(new Error("category not found", { cause: 404 }));
  // check category owner
  if (isExisit.createdBy.toString() !== req.user._id.toString())
    return next(new Error("you are not Owner of category", { cause: 403 }));
  //check file >> upload in cloudinary
  if (req.file) {
    const { public_id, secure_url } =
      await cloudinaryConnection.uploader.upload(req.file.path, {
        public_id: isExisit.image.id,
      });
      isExisit.image = { id: public_id, url: secure_url };
  }
  //update category
  if (req.body.Newname) req.body.slug = slugify(req.body.Newname);
  // if (req.file) (req.body.image = req), file.filename;
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  !category && res.status(404).json({ message: "Category Not found" });
  category && res.status(200).json({ message: "Category updated", category });
});

const deleteCategory = deleteOne(Category);

export {
  addCategory,
  allCategories,
  deleteCategory,
  updateCategory,
  OneCategory,
};
