const db = require("../../lib/db");

exports.postCreateUser = async (req, res, next) => {
  const {
    body: {
      firstName,
      lastName,
      email,
      role = "user",
      status = "pending",
      orgId,
      teamId = null,
    },
  } = req;
  const UserModel = db.loadModel("user");

  try {
    const createdUser = await UserModel.create({
      firstName,
      lastName,
      email,
      role,
      status,
      orgId,
      teamId,
    });
    return res.json(createdUser);
  } catch (err) {
    console.log(err);
    return res.json("Something went wrong");
  }
};

exports.getUserById = (req, res, next) => {
  const { user } = req;

  try {
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.json("Something went wrong");
  }
};

exports.putUpdateUserById = async (req, res, next) => {
  const {
    body: { firstName, lastName, email, role, status, orgId, teamId = null },
    user,
  } = req;

  try {
    const updatedUser = await user.update({
      firstName,
      lastName,
      email,
      role,
      status,
      orgId,
      teamId,
    });
    return res.json(updatedUser);
  } catch (err) {
    console.log(err);
    return res.json("Something went wrong");
  }
};

exports.deleteUserById = async (req, res, next) => {
  const { user } = req;

  try {
    const deletedUser = await user.destroy();
    return res.json(deletedUser);
  } catch (err) {
    console.log(err);
    return res.json("Something went wrong");
  }
};
