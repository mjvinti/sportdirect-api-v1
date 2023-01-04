const db = require("../../lib/db");

exports.loadUser = async (req, res, next) => {
  const { userId = null } = req.params;
  const UserModel = db.loadModel("user");

  if (!userId) {
    return res
      .status(400)
      .json("You provide the following required parameters: userId");
  }

  try {
    const foundUser = await UserModel.findByPk(userId);
    if (!foundUser) {
      return res.status(404).json(`There is no user for id: ${userId}`);
    }
    req.user = foundUser;
    next();
  } catch (err) {
    console.log(err);
    return res.json("Something went wrong");
  }
};
