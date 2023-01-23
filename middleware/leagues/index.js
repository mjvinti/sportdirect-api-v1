const { body } = require("express-validator");

exports.leagueBodyRules = () => [
  body("leagueName")
    .trim()
    .isLength({ min: 3 })
    .withMessage("leagueName must have a minimum of 3 characters"),
  body("status")
    .isIn(["active", "inactive"])
    .withMessage("status must be either 'active` or 'inactive'"),
];
