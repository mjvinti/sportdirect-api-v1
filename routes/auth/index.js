const express = require("express");

const router = express.Router();

const authController = require("../../controllers/auth");
const { userBodyRules } = require("../../middleware/users");
const { bodyValidate } = require("../../middleware/validation");

router.post("/signup", userBodyRules(), bodyValidate, authController.signup);

module.exports = router;
