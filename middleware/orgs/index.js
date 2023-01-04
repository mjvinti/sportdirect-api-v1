const db = require("../../lib/db");

exports.loadOrg = async (req, res, next) => {
  const { orgId = null } = req.params;
  const OrgModel = db.loadModel("org");

  if (!orgId) {
    return res
      .status(400)
      .json("You provide the following required parameters: orgId");
  }

  try {
    const foundOrg = await OrgModel.findByPk(orgId);
    if (!foundOrg) {
      return res.status(404).json(`There is no org for id: ${orgId}`);
    }
    req.org = foundOrg;
    next();
  } catch (err) {
    console.log(err);
    return res.json("Something went wrong");
  }
};
