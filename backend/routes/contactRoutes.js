const express =
require("express");

const router =
express.Router();

const {
  saveMessage,
  getMessages,
  deleteMessage
}
=
require(
  "../controllers/contactController"
);

router.post(
  "/",
  saveMessage
);

router.get(
  "/",
  getMessages
);

router.delete(
  "/:id",
  deleteMessage
);

module.exports = router;
