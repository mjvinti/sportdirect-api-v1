const {
  models: { org },
} = require("../../db");

exports.postCreateOrg = async (req, res, next) => {
  const { adminId = null, orgName, sport } = req.body;

  try {
    const createdOrg = await org.create({ adminId, orgName, sport });
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
    body: { adminId = null, orgName, sport },
    org,
  } = req;

  try {
    const updatedOrg = await org.update({ adminId, orgName, sport });
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
