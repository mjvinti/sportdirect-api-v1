const db = require("../../lib/db");

exports.loadUser = async (req, res, next) => {
  const {
    params: { userId = null },
  } = req;
  const UserModel = db.loadModel("user");

  if (!userId) {
    return res
      .status(400)
      .json("You must provide the following required parameters: userId");
  }

  try {
    const foundUser = await UserModel.findByPk(userId);
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
