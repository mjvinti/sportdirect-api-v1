const {
  models: { team },
} = require("../../db");

exports.loadTeam = async (req, res, next) => {
  const { teamId = null } = req.params;

  if (!teamId) {
    return res
      .status(400)
      .json("You provide the following required parameters: teamId");
  }

  try {
    const foundTeam = await team.findByPk(teamId);
    if (!foundTeam) {
      return res.status(404).json(`There is no user for id: ${teamId}`);
    }
    req.team = foundTeam;
    next();
  } catch (err) {
    console.log(err);
    return res.json("Something went wrong");
  }
};
