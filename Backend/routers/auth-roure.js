const express = require("express");
const {
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
} = require("../controller/user-controller");
const { authMiddleware, isAdmin, } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/refresh", handleRefreshToken);
router.post("/logout", logout);

router.post("/get_all_users", authMiddleware, getAllUsers);
router.get("/:id", authMiddleware, isAdmin, getSingleUser);
router.delete("/:id", authMiddleware, deleteUser);
router.post("/update_user", authMiddleware, updateUser);

router.post("/block_user/:id", authMiddleware, isAdmin, blockUser );
router.post("/unBlock_user/:id", authMiddleware, isAdmin, unBlockUser);

module.exports = router;
