import User from "../../../DB/models/user.model.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { ApiFeature } from "../../utils/ApiFeature.js";
import { deleteOne } from "../handler/handler.js";

const adduser = asyncHandler(async (req, res) => {
  let user = new User(req.body);

  await user.save();

  res.status(201).json({ message: "user added successfuly" });
});

const allUsers = asyncHandler(async (req, res) => {
  let apiFeature = new ApiFeature(User.find({}) , req.query)
  .fields()
  .sort()
  .pagination()
  .filter()
  .search(); 
  const users = await apiFeature.mongoQuery
  // let users = await User.find(filterObj).populate("category");
  res.status(200).json({ message: "All user", users });
}); // api feature with merge param

const Oneuser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  !user && res.status(404).json({ message: "user Not found" }); // !!
  user &&
    res.status(200).json({ message: "user of this Id:", user });
});

const updateuser = asyncHandler(async (req, res) => {

  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  !user && res.status(404).json({ message: "user Not found" });
  user && res.status(200).json({ message: "user updated", user });
});

const deleteuser = deleteOne(User);

export {
  allUsers,
  adduser,
  Oneuser,
  deleteuser,
  updateuser,
};
