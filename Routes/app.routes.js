const express = require("express");
const router = express.Router();

const userController = require("../Controllers/user.controller");
const chatController = require("../Controllers/chat.controller");
const messageController = require("../Controllers/message.controller");
const notificationController = require("../Controllers/notification.controller");

router.post("/user", userController.create);
router.get("/user", userController.findAll);
router.post("/user/verifycode", userController.verifyCode);
router.post("/user/resendcode", userController.resendCode);
router.post("/user/update", userController.updateProfile);

router.post("/chat", chatController.create);
router.get("/chat/:uid", chatController.findAll);
router.get("/chat/:uid/:uid2", chatController.findOne);

router.post("/message", messageController.create);
router.get("/message/:chatId", messageController.findAll);
router.get("/lastmessage/:chatId", messageController.findLastMessage);

router.post("/notification", notificationController.create);
router.get("/notification", notificationController.findAll);
router.post("/notification/delete", notificationController.delete);

module.exports = router;
