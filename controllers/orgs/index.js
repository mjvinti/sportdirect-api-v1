const {
  models: { org },
} = require("../../db");

exports.postCreateOrg = async (req, res, next) => {
  const { adminId = null, orgName, sport, status = "active" } = req.body;

  try {
    const createdOrg = await org.create({ adminId, orgName, sport, status });
    return res.json(createdOrg);
  } catch (err) {
    console.log(err);
    return res.json("Something went wrong");
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
    body: { adminId = null, orgName, sport, status },
    org,
  } = req;

  try {
    const updatedOrg = await org.update({ adminId, orgName, sport, status });
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
