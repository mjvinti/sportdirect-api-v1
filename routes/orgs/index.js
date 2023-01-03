const router = require("express").Router();

const orgsController = require("../../controllers/orgs");
const { loadOrg } = require("../../middleware/orgs");

router.post("/", orgsController.postCreateOrg);

router.get("/:orgId", loadOrg, orgsController.getOrgById);

router.put("/:orgId", loadOrg, orgsController.putUpdateOrgById);

router.delete("/:orgId", loadOrg, orgsController.deleteOrgById);

router.post("/:orgId/team", loadOrg, orgsController.postCreateOrgTeam);

router.post("/:orgId/user", loadOrg, orgsController.postCreateOrgUser);

module.exports = router;
