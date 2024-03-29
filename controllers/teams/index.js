const db = require("../../lib/db");

exports.postCreateTeam = async (req, res, next) => {
  const {
    body: { orgId, teamName, status = "active" },
  } = req;
  const TeamModel = db.loadModel("team");

  try {
    const createdTeam = await TeamModel.create({ orgId, teamName, status });
    return res.json(createdTeam);
  } catch (err) {
    return res
      .status(500)
      .json("Something went wrong creating the team. Please try again later.");
  }
};

exports.getTeamById = (req, res, next) => {
  const { team } = req;

  try {
    return res.json(team);
  } catch (err) {
    return res
      .status(500)
      .json("Something went wrong fetching the team. Please try again later.");
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
    return res
      .status(500)
      .json("Something went wrong updating the team. Please try again later.");
  }
};

exports.deleteTeamById = async (req, res, next) => {
  const { team } = req;

  try {
    const deletedTeam = await team.destroy();
    return res.json(deletedTeam);
  } catch (err) {
    return res
      .status(500)
      .json("Something went wrong deleting the team. Please try again later.");
  }
};

exports.postCreateTeamUser = async (req, res, next) => {
  const {
    body: { firstName, lastName, email, role = "user", status = "pending" },
    team: { orgId, createUser },
  } = req;

  try {
    const createdUser = await createUser({
      firstName,
      lastName,
      email,
      role,
      status,
      orgId,
    });
    return res.json(createdUser);
  } catch (err) {
    return res
      .status(500)
      .json("Something went wrong creating the user. Please try again later.");
  }
};
