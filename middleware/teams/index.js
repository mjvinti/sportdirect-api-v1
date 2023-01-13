const { body } = require("express-validator");

const db = require("../../lib/db");

exports.teamBodyRules = () => [
  body("teamName")
    .trim()
    .isLength({ min: 3 })
    .withMessage("teamName must have a minimum of 3 characters"),
  body("status")
    .isIn(["active", "inactive"])
    .withMessage("status must be either 'active` or 'inactive'"),
  body("orgId")
    .isNumeric()
    .not()
    .isEmpty()
    .withMessage("orgId is a required field"),
];

exports.loadTeam = async (req, res, next) => {
  const {
    params: { teamId = null },
  } = req;
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
