const db = require("../../lib/db");

exports.postCreateOrg = async (req, res, next) => {
  const {
    body: { orgName, sport, status = "active" },
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
    console.log(err);
    return res.json("Something went wrong");
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
    console.log(err);
    return res.json("Something went wrong");
  }
};

exports.deleteOrgById = async (req, res, next) => {
  const { org } = req;

  try {
    const deletedOrg = await org.destroy();
    return res.json(deletedOrg);
  } catch (err) {
    console.log(err);
    return res.json("Something went wrong");
  }
};

exports.postCreateOrgTeam = async (req, res, next) => {
  const {
    body: { teamName, status = "active" },
    org,
  } = req;

  try {
    const createdTeam = await org.createTeam({ teamName, status });
    return res.json(createdTeam);
  } catch (err) {
    console.log(err);
    return res.json("Something went wrong");
  }
};

exports.postCreateOrgUser = async (req, res, next) => {
  const {
    body: {
      firstName,
      lastName,
      email,
      role = "user",
      status = "pending",
      teamId = null,
    },
    org,
  } = req;

  try {
    const createdUser = await org.createUser({
      firstName,
      lastName,
      email,
      role,
      status,
      teamId,
    });
    return res.json(createdUser);
  } catch (err) {
    console.log(err);
    return res.json("Something went wrong");
  }
};
