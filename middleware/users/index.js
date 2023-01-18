const { body } = require("express-validator");

const db = require("../../lib/db");
const { rolesArr, statusesArr } = require("../../lib/users");

exports.loadUser = async (req, res, next) => {
  const {
    params: { userId = null },
  } = req;

  if (!userId) {
    return res
      .status(400)
      .json("You must provide the following required parameters: userId");
  }

  try {
    const foundUser = await db.loadModel("user").findByPk(userId);
    if (!foundUser) {
      return res.status(404).json(`There is no user for id: ${userId}`);
    }
    req.user = foundUser;
    next();
  } catch (err) {
    return res
      .status(500)
      .json("Something went wrong loading the user. Please try again later.");
  }
};

exports.userBodyRules = () => [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("firstName must not be empty"),
  body("lastName").trim().notEmpty().withMessage("lastName must not be empty"),
  body("email")
    .normalizeEmail()
    .isEmail()
    .withMessage("email must be valid")
    .custom(async (email) => {
      const user = await db.loadModel("user").findOne({ where: { email } });
      if (user) {
        return Promise.reject("email address already exists");
      }
    }),
  body("role")
    .isIn(rolesArr)
    .withMessage(`must be a valid role: ${rolesArr.join(", ")}`),
  body("status")
    .isIn(statusesArr)
    .withMessage(`must be a valid status: ${statusesArr.join(", ")}`),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("password must have a minimum of 8 characters"),
];
