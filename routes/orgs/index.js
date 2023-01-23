const router = require("express").Router();

const {
  getOrgById,
  postCreateOrg,
  postCreateOrgLeague,
  putUpdateOrgById,
  deleteOrgById,
} = require("../../controllers/orgs");

const { leagueBodyRules } = require("../../middleware/leagues");
const { loadOrg, orgBodyRules } = require("../../middleware/orgs");
const { bodyValidate } = require("../../middleware/validation");

router.post("/", orgBodyRules(), bodyValidate, postCreateOrg);

router.get("/:orgId", loadOrg, getOrgById);

router.put("/:orgId", orgBodyRules(), bodyValidate, loadOrg, putUpdateOrgById);

router.delete("/:orgId", loadOrg, deleteOrgById);

router.post(
  "/:orgId/league",
  leagueBodyRules,
  bodyValidate,
  loadOrg,
  postCreateOrgLeague
);

module.exports = router;
