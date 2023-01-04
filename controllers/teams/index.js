const db = require("../../lib/db");

exports.postCreateTeam = async (req, res, next) => {
  const {
    body: { orgId = null, teamName, status = "active" },
  } = req;
  const TeamModel = db.loadModel("team");

  if (!orgId) {
    return res
      .status(400)
      .json("You provide the following required parameters: orgId");
  }

  try {
    const createdTeam = await TeamModel.create({ orgId, teamName, status });
    return res.json(createdTeam);
  } catch (err) {
    console.log(err);
    return res.json("Something went wrong");
  }
};

exports.getTeamById = (req, res, next) => {
  const { team } = req;

  try {
    return res.json(team);
  } catch (err) {
    console.log(err);
    return res.json("Something went wrong");
  }
};

exports.putUpdateTeamById = async (req, res, next) => {
  const {
    body: { orgId, teamName, status },
    team,
  } = req;

  try {
    const updatedTeam = await team.update({ orgId, teamName, status });
    return res.json(updatedTeam);
  } catch (err) {
    console.log(err);
    return res.json("Something went wrong");
  }
};

exports.deleteTeamById = async (req, res, next) => {
  const { team } = req;

  try {
    const deletedTeam = await team.destroy();
    return res.json(deletedTeam);
  } catch (err) {
    console.log(err);
    return res.json("Something went wrong");
  }
};

exports.postCreateTeamUser = async (req, res, next) => {
  const {
    body: {
      firstName,
      lastName,
      email,
      role = "user",
      status = "pending",
      orgId,
    },
    team,
  } = req;

  try {
    const createdUser = await team.createUser({
      firstName,
      lastName,
      email,
      role,
      status,
      orgId,
    });
    return res.json(createdUser);
  } catch (err) {
    console.log(err);
    return res.json("Something went wrong");
  }
};
