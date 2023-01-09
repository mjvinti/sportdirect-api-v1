const { body, validationResult } = require("express-validator");

const db = require("../../lib/db");
const { sportsArr } = require("../../lib/orgs");

exports.orgBodyRules = () => [
  body("orgName").trim().isLength({ min: 3 }),
  body("status").isIn(["active", "inactive"]),
  body("sport").isIn(sportsArr),
];

exports.orgBodyValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({ errors: errors.array() });
};

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
