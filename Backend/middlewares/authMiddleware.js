const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers["authorization"] || "";
  if (authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        const user = await User.findById({ _id: decoded?.id });
        req.user = user;
        next();
      }
    } catch (err) {
      throw new Error("Token Expired");
    }
  } else {
    throw new Error("Uset Token Not Found");
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
    console.log("req.user", req.user);
  const { email } = req.user;
  const user = await User.findOne({ email });

  if (user.role === "admin") {
    next();
  } else {
    throw new Error("You are not the admin");
  }
});



module.exports = { authMiddleware, isAdmin,  };
