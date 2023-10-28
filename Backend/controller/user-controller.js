const { generateTok } = require("../config/jwt");
const User = require("../models/user-model");
const asyncHandler = require("express-async-handler");
const { validateMongoId } = require("../utils/validateMongoId");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    const newUser = await User.create(req.body);
    console.log(newUser);
    res.json({ ststus: true, result: newUser });
  } else {
    //normal err
    // res.json({ status: false, message: "User Already Exists" });
    //custom err
    throw new Error("User Already Exists");
  }
});
// ref - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTExYzU5NzAzNDU3Zjk4Y2I4YThiYiIsImlhdCI6MTY5MjQ3NjczNSwiZXhwIjoxNjkyNzM1OTM1fQ._9zSOGyNVkE9jtXj-pNTDiJ_a19mDu2vYkBGZBLGICs

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  if (!cookies?.refreshToken)
    throw new Error("No Refresh Token in the cookies");
  const refreshToken = cookies.refreshToken;

  const user = await User.findOne({ refreshToken });
  if (user) {
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
      console.log("decoded", decoded, user._is);
      if (err || user._id !== decoded.id) {
        throw new Error("some thing wrong with Refresh token");
      } else {
        const accessToken = generateTok(user._id);

        res.json({ status: true, accessToken });
      }
    });
  } else {
    throw new Error("No Refresh token in DB");
  }
  res.json({ status: true, result: user });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email: email });
  console.log(findUser,email,password)
  if (findUser && (await findUser.isPasswordMatched(password))) {
    //Generating a refresh token
    const refreshToken = await generateRefreshToken(findUser._id);

    //updating the DB with User Token
    const updateUser = await User.findByIdAndUpdate(
      findUser._id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );

    // storing the userToken tn the cookie storage
    // maxAge : hrs*mins*sec*1000
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });

    console.log("updateUser", updateUser);
    let result = {
      _id: findUser._id,
      firstName: findUser?.firstName,
      lastname: findUser?.lastName,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateTok(findUser._id) || null,
    };
    // console.log(result);
    res.json({ status: true, result: result });
  } else {
    //normal err
    // res.json({ status: false, message: "User Already Exists" });
    //custom err
    throw new Error("Invalid User");
  }
});

const logout = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken)
    throw new Error("No Refresh Token in the cookies");
  const user = await User.findOne({ refreshToken: cookies?.refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", { httpOnly: true, secure: true });
    res.sendStatus(400);
  } else {
    await User.findOneAndUpdate(user._id, { refreshToken: "" });
    res.clearCookie("refreshToken", { httpOnly: true, secure: true });
    return res.sendStatus(204);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const { _id, token, firstName, lastName, email, mobile } = req.body;
    const findUser = await User.findByIdAndUpdate(
      _id,
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobile: mobile,
      },
      {
        new: true,
      }
    );

    if (findUser) res.json({ status: true, message: "User Updated" });
  } catch (err) {
    throw new Error(err);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoId(id);
    const singleUser = await User.findByIdAndDelete({ _id: id });
    // console.log(singleUser);
    res.json({ status: true, result: singleUser || {} });
  } catch (err) {
    throw new Error(err);
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json({ status: true, result: allUsers || [] });
  } catch (err) {
    throw new Error(err);
  }
});

const getSingleUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoId(id);
    const singleUser = await User.findById({ _id: id });
    // console.log(singleUser);
    res.json({ status: true, result: singleUser || {} });
  } catch (err) {
    throw new Error(ErrorEvent);
  }
});

const blockUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const blocked = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      { new: true }
    );
    // console.log("blocked", blocked);
    if (blocked) res.json({ message: "You have been blocked" });
  } catch (err) {
    throw new Error(err);
  }
});

const unBlockUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoId(id);
  // console.log(req.params);
  try {
    const unBlocked = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      { new: true }
    );
    // console.log("unBlocked", unBlocked);
    if (unBlocked) res.json({ message: "You have been Un Blocked" });
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
  blockUser,
  unBlockUser,
  handleRefreshToken,
  logout,
};
