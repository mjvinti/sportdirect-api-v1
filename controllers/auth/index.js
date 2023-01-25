require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../../lib/db");

exports.signup = async (req, res, next) => {
  const {
    body: { firstName, lastName, email, password, role, status },
  } = req;

  try {
    const hashedPw = await bcrypt.hash(password, 12);
    const signupUser = await db
      .loadModel("user")
      .create({ firstName, lastName, email, password: hashedPw, role, status });
    return res.status(201).json(signupUser);
  } catch (err) {
    return res
      .status(500)
      .json(
        "Something went wrong signing up the user. Please try again later."
      );
  }
};

exports.login = async (req, res, next) => {
  const {
    body: { email, password },
  } = req;

  try {
    const user = await db.loadModel("user").findOne({ where: { email } });
    if (!user) {
      return res.status(401).json(`No user found with email: ${email}`);
    }

    const isPasswordsEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordsEqual) {
      return res
        .status(401)
        .json("The password entered is incorrect. Please try again.");
    }

    const { JWT_SECRET } = process.env;
    const token = jwt.sign({ user }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({ token, auth: user });
  } catch (err) {
    return res
      .status(500)
      .json(
        "Something went wrong logging in the user. Please try again later."
      );
  }
};
