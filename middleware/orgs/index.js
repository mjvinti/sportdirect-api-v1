const db = require("../../lib/db");

exports.loadOrg = async (req, res, next) => {
  const {
    params: { orgId = null },
  } = req;

  if (!orgId) {
    return res
      .status(400)
      .json("You must provide the following required parameters: orgId");
  }

  try {
    const foundOrg = await db.loadModel("org").findByPk(orgId);
    if (!foundOrg) {
      return res.status(404).json(`There is no org for id: ${orgId}`);
    }
    req.org = foundOrg;
    next();
  } catch (err) {
    return res
      .status(500)
      .json("Something went wrong loading the org. Please try again later.");
  }
};
