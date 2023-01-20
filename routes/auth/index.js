const express = require("express");

const router = express.Router();

const { login, signup } = require("../../controllers/auth");

const { loginBodyRules } = require("../../middleware/auth");
const { userBodyRules } = require("../../middleware/users");
const { bodyValidate } = require("../../middleware/validation");

router.post("/signup", userBodyRules(), bodyValidate, signup);

router.post("/login", loginBodyRules(), bodyValidate, login);

module.exports = router;
