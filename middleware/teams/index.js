const db = require("../../lib/db");

exports.loadTeam = async (req, res, next) => {
  const { teamId = null } = req.params;
  const TeamModel = db.loadModel("team");

  if (!teamId) {
    return res
      .status(400)
      .json("You must provide the following required parameters: teamId");
  }

  try {
    const foundTeam = await TeamModel.findByPk(teamId);
    if (!foundTeam) {
      return res.status(404).json(`There is no team for id: ${teamId}`);
    }
    req.team = foundTeam;
    next();
  } catch (err) {
    return res
      .status(500)
      .json("Something went wrong loading the team. Please try again later.");
  }
};
