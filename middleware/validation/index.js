const { validationResult } = require("express-validator");

exports.bodyValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res
    .status(422)
    .json({ message: "Validation failed.", errors: errors.array() });
};
