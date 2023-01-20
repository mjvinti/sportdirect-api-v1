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

    req.userId = decodedToken.id;
    next();
  } catch (err) {
    return res
      .status(500)
      .json("There was an error authenticating the user. Please try again.");
  }
};
