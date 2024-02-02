import User from "../../../DB/models/user.model.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";

const addAddress = asyncHandler(async (req, res) => {
  const { address } = await User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { addresses: req.body } },
    { new: true }
  );
  // !address && res.status(404).json({ message: "address Not found" });
  address && res.status(201).json({ message: "address updated", address });
});
const removeAddress = asyncHandler(async (req, res) => {
  const { address } = await User.findByIdAndUpdate(
    req.user._id,
    { $pull: { address: {_id:req.params.id} } }, // productId in address array ,
    { new: true }
  );
  !address && res.status(404).json({ message: "address Not found" });
  address && res.status(200).json({ message: "address updated", address });
});
const getaddress = asyncHandler(async (req, res) => {
  const { addresses } = await User.findById(req.user._id);
  !addresses && res.status(404).json({ message: "addresses Not found" });
  addresses && res.status(200).json({ message: "addresses : ", addresses });
});
export { addAddress, removeAddress, getaddress };
    