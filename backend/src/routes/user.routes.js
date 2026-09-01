const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");


router.get("/", authMiddleware(["user","admin"]), userController.getAllUsers);
router.get("/:id", authMiddleware(["user","admin"]), userController.getUserById);
router.put("/:id", authMiddleware(["user"]), userController.updateUser);
router.delete("/:id", authMiddleware(["admin"]), userController.deleteUser);

module.exports = router;