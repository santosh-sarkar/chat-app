const express = require("express");
const router = express.Router();

const messageController = require("../controllers/message.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware(["user","admin"]), messageController.getMessages);
router.get("/stats", authMiddleware(["user","admin"]), messageController.getMessageStats);

module.exports = router;