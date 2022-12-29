const {
  models: { user },
} = require("../../db");

exports.postCreateUser = async (req, res, next) => {
  const { firstName, lastName, email, role = "user", orgId } = req.body;

  try {
    const createdUser = await user.create({
      firstName,
      lastName,
      email,
      role,
      orgId,
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
    body: { firstName, lastName, email, role, orgId },
    user,
  } = req;

  try {
    const updatedUser = await user.update({
      firstName,
      lastName,
      email,
      role,
      orgId,
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
