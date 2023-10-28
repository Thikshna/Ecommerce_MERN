const jwt = require("jsonwebtoken");
const ObjectID = require("mongodb").ObjectId;

const generateTok = (id) => {
 return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

module.exports = {
  generateTok,
};
