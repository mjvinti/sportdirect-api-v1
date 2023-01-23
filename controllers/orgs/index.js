const db = require("../../lib/db");

exports.postCreateOrg = async (req, res, next) => {
  const {
    body: { orgName, sport, status },
  } = req;
  const OrgModel = db.loadModel("org");

  try {
    const createdOrg = await OrgModel.create({ orgName, sport, status });
    return res.json(createdOrg);
  } catch (err) {
    return res
      .status(500)
      .json("Something went wrong creating the org. Please try again later.");
  }
};

exports.getOrgById = (req, res, next) => {
  const { org } = req;

  try {
    return res.json(org);
  } catch (err) {
    return res.json(
      "Something went wrong fetching the org. Please try again later."
    );
  }
};

exports.putUpdateOrgById = async (req, res, next) => {
  const {
    body: { orgName, sport, status },
    org,
  } = req;

  try {
    const updatedOrg = await org.update({ orgName, sport, status });
    return res.json(updatedOrg);
  } catch (err) {
    return res
      .status(500)
      .json("Something went wrong updating the org. Please try again later.");
  }
};

exports.deleteOrgById = async (req, res, next) => {
  const { org } = req;

  try {
    const deletedOrg = await org.destroy();
    return res.json(deletedOrg);
  } catch (err) {
    return res
      .status(500)
      .json("Something went wrong deleting the org. Please try again later.");
  }
};

exports.postCreateOrgLeague = async (req, res, next) => {
  const {
    body: { leagueName, status },
    org,
  } = req;

  try {
    const createdLeague = await org.createLeague({ leagueName, status });
    return res.status(201).json(createdLeague);
  } catch (err) {
    return res
      .status(500)
      .json(
        "Something went wrong creating the league. Please try again later."
      );
  }
};
