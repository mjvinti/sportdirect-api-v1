const router = require("express").Router();

const teamsController = require("../../controllers/teams");
const { loadTeam } = require("../../middleware/teams");

router.post("/", teamsController.postCreateTeam);

router.get("/:teamId", loadTeam, teamsController.getTeamById);

router.put("/:teamId", loadTeam, teamsController.putUpdateTeamById);

router.delete("/:teamId", loadTeam, teamsController.deleteTeamById);

module.exports = router;
