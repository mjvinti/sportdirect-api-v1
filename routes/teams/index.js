const router = require("express").Router();

const teamsController = require("../../controllers/teams");
const { loadTeam, teamBodyRules } = require("../../middleware/teams");
const { bodyValidate } = require("../../middleware/validation");

router.post("/", teamBodyRules(), bodyValidate, teamsController.postCreateTeam);

router.get("/:teamId", loadTeam, teamsController.getTeamById);

router.put(
  "/:teamId",
  teamBodyRules(),
  bodyValidate,
  loadTeam,
  teamsController.putUpdateTeamById
);

router.delete("/:teamId", loadTeam, teamsController.deleteTeamById);

router.post("/:teamId/user", loadTeam, teamsController.postCreateTeamUser);

module.exports = router;
