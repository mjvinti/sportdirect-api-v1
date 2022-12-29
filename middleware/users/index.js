const {
  models: { user },
} = require("../../db");

exports.loadUser = async (req, res, next) => {
  const { userId = null } = req.params;

  if (!userId) {
    return res.json("You provide the following required parameters: userId");
  }

  try {
    const foundUser = await user.findByPk(userId);
    if (!foundUser) {
      return res.json(`There is no user for id: ${userId}`);
    }
    req.user = foundUser;
    next();
  } catch (err) {
    console.log(err);
    return res.json("Something went wrong");
  }
};
