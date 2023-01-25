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

exports.isAdmin = (req, res, next) => {
  const {
    user: { role },
  } = req;

  if (!role === "admin") {
    return res
      .status(401)
      .json("User does not have permissions to perform this action.");
  }

  next();
};
