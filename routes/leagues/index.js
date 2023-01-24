const router = require("express").Router();

const { postCreateLeague } = require("../../controllers/leagues");

const { leagueBodyRules } = require("../../middleware/leagues");
const { bodyValidate } = require("../../middleware/validation");

router.post("/", leagueBodyRules(), bodyValidate, postCreateLeague);

module.exports = router;
