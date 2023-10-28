const jwt = require("jsonwebtoken");
const ObjectID = require("mongodb").ObjectId;

const generateRefreshToken = (id) => {
 return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

module.exports = {
    generateRefreshToken,
};
