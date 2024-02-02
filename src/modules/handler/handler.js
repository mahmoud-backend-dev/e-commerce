import { asyncHandler } from "../../middlewares/asyncHandler.js";

export const deleteOne = (model) => {
  return asyncHandler(async (req, res) => {
    const document = await model.findByIdAndDelete(req.params.id);
    //delete img in cloudinary how?!
    !document && res.status(404).json({ message: "document Not found" });
    document && res.status(200).json({ message: "document deleted", document });
  });
};
