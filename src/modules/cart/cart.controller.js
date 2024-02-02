import Cart from "../../../DB/models/cart.model.js";
import Product from "../../../DB/models/product.model.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";

const pricCalc = async (model) => {
  let totalPrice = 0;
  model.cartItems.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });
  await model.save();
};

const addCart = asyncHandler(async (req, res, next) => {
  // check productId if exisit or not
  const product = await Product.findById(req.body.productId);
  !product && next(new Error("product not found", { cause: 404 }));
  // check productQuantity
  if (product.quantity < req.body.quantity)
    return next(new Error("product sold out"));
  // put product.price in res
  req.body.price = product.price;
  // one cart per user
  const isCart = await Cart.findOne({ user: req.user._id });
  // check if cart exisit or not

  //if not exisit {create cart, push product}
  if (!isCart) {
    const cart = new Cart({
      user: req.user._id,
      cartItems: [req.body],
    });
    //calc total price
    pricCalc(cart);
    !cart && res.status(404).json({ message: "cart Not found" }); //دا ليه!!
    cart && res.status(201).json({ message: "cart updated", cart });
  } else {
    //if exisit { push product}{if product>> its quantity >> check quantity in db}
    // find if body.product === cartItems.product (same product)
    let item = isCart.cartItems.find((i) => i.productId === req.body.productId); // shallow copy
    //then add one product in quantity
    if (item) {
      //check quantity in db مع كل مره بيزود
      if (item.quantity >= product.quantity)
        return next(new Error("product sold out"));
      item.quantity += req.body.quantity || 1;
    }
    // else push new product to cart
    else isCart.cartItems.push(req.body);
    // calc total price
    pricCalc(isCart);
    // save in db

    // send res
    res.status(201).json({ message: "cart updated", cart: isCart });
  }
});

const removeItemFromCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { cartItems: { _id: req.params.id } } },
    { new: true }
  );
  pricCalc(cart); // reCalc
  !cart && res.status(404).json({ message: "cart Not found" });
  cart && res.status(200).json({ message: "cart updated", cart });
});

const updateQuantity = asyncHandler(async (req, res) => {
  // check cart
  const cart = await Cart.findByOne({ user: req.user._id });
  // if not exisit res
  !cart && res.status(404).json({ message: "cart Not found" });
  // get cartItems id for update quantity of certien item
  let item = cart.cartItems.find((item) => item._id === req.params.id);
  if (!item) return next(new Error("item not found", { cause: 404 }));
  // update quantity of item
  item.quantity = req.body.quantity;
  // calc price
  pricCalc(cart);
  // save
  //send res
  cart && res.status(200).json({ message: "cart : ", cart });
});

const getLogedUserCart = asyncHandler(async (req, res) => {
  // check cart
  const cart = await Cart.findByOne({ user: req.user._id }).populate([
    { path: "cartItems.productId" },
  ]);
  //send res
  !cart && res.status(404).json({ message: "cart Not found" });
  cart && res.status(200).json({ message: "cart : ", cart });
});

const clearUserCart = asyncHandler(async (req, res) => {
  // check cart
  const cart = await Cart.findByOneAndDelete({ user: req.user._id });
  //send res
  !cart && res.status(404).json({ message: "cart Not found" });
  cart && res.status(200).json({ message: "cart : ", cart });
});
export {
  addCart,
  removeItemFromCart,
  updateQuantity,
  getLogedUserCart,
  clearUserCart,
};
