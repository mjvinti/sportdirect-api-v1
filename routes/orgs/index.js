const router = require("express").Router();

const {
  getOrgById,
  postCreateOrg,
  postCreateOrgLeague,
  putUpdateOrgById,
  deleteOrgById,
} = require("../../controllers/orgs");

const { isAuthenticated } = require("../../middleware/auth");
const { leagueBodyRules } = require("../../middleware/leagues");
const { loadOrg, orgBodyRules } = require("../../middleware/orgs");
const { loadUser } = require("../../middleware/users");
const { bodyValidate } = require("../../middleware/validation");

router.use(isAuthenticated);

router.post("/", loadUser, orgBodyRules(), bodyValidate, postCreateOrg);

router.get("/:orgId", loadOrg, getOrgById);

router.put("/:orgId", orgBodyRules(), bodyValidate, loadOrg, putUpdateOrgById);

router.delete("/:orgId", loadOrg, deleteOrgById);

router.post(
  "/:orgId/league",
  leagueBodyRules(),
  bodyValidate,
  loadOrg,
  postCreateOrgLeague
);

module.exports = router;
