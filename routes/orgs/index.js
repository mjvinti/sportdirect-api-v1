const router = require("express").Router();

const orgsController = require("../../controllers/orgs");
const { loadOrg, orgBodyRules } = require("../../middleware/orgs");
const { bodyValidate } = require("../../middleware/validation");

router.post("/", orgBodyRules(), bodyValidate, orgsController.postCreateOrg);

router.get("/:orgId", loadOrg, orgsController.getOrgById);

router.put(
  "/:orgId",
  orgBodyRules(),
  bodyValidate,
  loadOrg,
  orgsController.putUpdateOrgById
);

router.delete("/:orgId", loadOrg, orgsController.deleteOrgById);

router.post("/:orgId/team", loadOrg, orgsController.postCreateOrgTeam);

router.post("/:orgId/user", loadOrg, orgsController.postCreateOrgUser);

module.exports = router;
