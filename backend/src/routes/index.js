const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes")
const userRoutes = require("./user.routes")
const messageRoutes = require("./message.route")

router.use("/auth",authRoutes)
router.use("/users",userRoutes)
router.use("/messages",messageRoutes)

module.exports = router;