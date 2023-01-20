require("dotenv").config();
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

exports.isAuthenticated = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      return res.status(401).json("User is not authenticated");
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json("User is not authenticated.");
    }

    req.authUser = decodedToken.user;
    next();
  } catch (err) {
    return res
      .status(500)
      .json("There was an error authenticating the user. Please try again.");
  }
};

exports.loginBodyRules = () => [
  body("email").normalizeEmail().isEmail().withMessage("email must be valid"),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("password must have a minimum of 8 characters"),
];
