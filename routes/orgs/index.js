const router = require("express").Router();

const orgsController = require("../../controllers/orgs");
const { loadOrg } = require("../../middleware/orgs");

router.post("/", orgsController.postCreateOrg);

router.get("/:orgId", loadOrg, orgsController.getOrgById);

router.put("/:orgId", loadOrg, orgsController.putUpdateOrgById);

router.delete("/:orgId", loadOrg, orgsController.deleteOrgById);

module.exports = router;
