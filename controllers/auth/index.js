const bcrypt = require("bcryptjs");

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
