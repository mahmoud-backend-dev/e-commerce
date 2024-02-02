import User from "../../../DB/models/user.model.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { htmlCode, htmlMail } from "../../services/emails/htmlTemplete.js";
import { sendEmail } from "../../services/emails/sendEmail.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import randomstring from "randomstring";

const signUp = asyncHandler(async (req, res, next) => {
  //get data from req
  let { email, username, password, confirmPassword } = req.body;
  //check data
  const isExisit = await User.findOne({ email });
  isExisit && next(new Error("User already exisit", { cause: 409 }));
  // if not exisit hash pass
  //in user.model.js
  //generate token from email
  const emailToken = jwt.sign({ email  }, process.env.JWT_SECRET_KEY);
  // create user
  const user = await User.create({ ...req.body });
  // create confirmatiom link
  const link = `${process.env.BASE_URL}/api/v1/auth/acctivate_account/${emailToken}`;
  // send confirmation link
  await sendEmail({
    to: email,
    subject: "Acctive your account...",
    html: htmlMail(link),
  });
  // send res
  res.status(201).json({ message: "sign up successfuly, Now check your email", 
  user:user.username  });
});

const protectedRoute = asyncHandler(async (req, res, next) => {
  // get Token
  const { token } = req.headers;
  //token exisit 401
  // verify token
  const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
  // check User by token.userId
  const user = await User.findById(payload.userId);
  // if not exisit res
  !user && next(new Error("there is no user for this token", { cause: 401 }));
  if (user?.changePassAt) {
    // if exisit compare between time Date.now() of User.changePassAt
    // vs token.iat
    const time = parseInt(user?.changePassAt.getTime() / 1000);
    // time > token it means token older (invalid)
    if (time > payload.iat) {
      next(new Error("token expaired... login again ", { cause: 400 }));
    }
  }
  req.user = user;
  next();
});
const allowTo = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new Error("you are not authorized", { cause: 401 }));
    }
    next();
  });
};

const activeAccount = asyncHandler(async (req, res) => {
  //find user by emailToken
  const { emailToken } = req.params;
  const { email } = jwt.verify(emailToken, process.env.JWT_SECRET_KEY);
  //update isEmailConfirm
  const user = await User.findOneAndUpdate(
    { email },
    { isEmailConfirm: true },
    { new: true }
  );
  !user && next(new Error("user Not found", { cause: 404 }));
  // create a cart //TODO
  //send res
  user &&
    res
      .status(200)
      .json({ message: "acctivate your account successfuly", user });
});

const logIn = asyncHandler(async (req, res, next) => {
  //get data from req
  const { email, password } = req.body;
  //check data by email
  const user = await User.findOne({ email });
  !user && next(new Error("User Not found", { cause: 404 }));
  //check isEmailConfirm
  if (!user.isEmailConfirm) {
    next(new Error("please acctive your account first", { cause: 400 }));
  }
  //compare password
  const match = bcryptjs.compareSync(password, user.password);
  if (!match) {
    next(new Error("Incorrect Password", { cause: 400 }));
  }
  //generate token
  const token = jwt.sign({ email, userId: user._id,role:user.role }, process.env.JWT_SECRET_KEY);

  //send res
  user && res.status(200).json({ message: "log in successfuly",
   Token:token });
});

const forgetPass = asyncHandler(async (req, res) => {
  // get email from req
  const { email } = req.body;
  // check email in db
  const user = await User.findOne({ email });
  !user && next(new Error("user not found", { cause: 404 }));
  // check isEmailConfirm
  !user.isEmailConfirm &&
    next(new Error("You should acctivate your account first", { cause: 404 }));
  //generate forgetCode
  const forgetCode = randomstring.generate({
    charset: "numeric",
    length: 5,
  });
  //save forgetCode to User model
  user.forgetCode = forgetCode;
  await user.save();
  // send forgetCode (go to api resetPass)
  await sendEmail({
    to: email,
    subject: "Your Forget Code",
    html: htmlCode(forgetCode),
  });
  // send res
  res.status(200).json({
    message: "You can Reset your password Now , check your Email",
    user,
  });
});

const resetPass = asyncHandler(async (req, res, next) => {
  //get data from req
  const { newPassword, confirmPassword, code } = req.body;
  // check user
  const user = await User.findOne(req.user._id);
  !user && next(new Error("Invalid Email", { cause: 404 }));
  //check forgetCode
  if (user.forgetCode !== code)
    return next(new Error("Invalid Code", { cause: 404 }));
  // create new token
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET_KEY
  );
  // hash & update password
  await User.findByIdAndUpdate(
    req.user._id,
    { password: newPassword, changePassAt: Date.now() },
    { new: true }
  );
  //send res
  res.status(200).json({
    message: "reset your Password successfuly , try to login now",
    token,
  });
});

export {
  signUp,
  activeAccount,
  logIn,
  forgetPass,
  protectedRoute,
  allowTo,
  resetPass,
};
