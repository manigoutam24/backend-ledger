const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const accountController = require("../controllers/account.controller");

const router = express.Router();

/**
 * - POST/account/
 * create new account
 * procected routes
 */

router.post(
  "/",
  authMiddleware.authMiddleware,
  accountController.createAccountController,
);

module.exports = router;
