const {
  models: { org },
} = require("../../db");

exports.loadOrg = async (req, res, next) => {
  const { orgId = null } = req.params;

  if (!orgId) {
    return res.json("You provide the following required parameters: orgId");
  }

  try {
    const foundOrg = await org.findByPk(orgId);
    if (!foundOrg) {
      return res.json(`There is no org for id: ${orgId}`);
    }
    req.org = foundOrg;
    next();
  } catch (err) {
    console.log(err);
    return res.json("Something went wrong");
  }
};
