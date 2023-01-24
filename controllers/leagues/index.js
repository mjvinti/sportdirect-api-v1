const db = require("../../lib/db");

exports.postCreateLeague = async (req, res, next) => {
  const {
    body: { leagueName, orgId, status },
  } = req;

  if (!orgId) {
    return res
      .status(422)
      .json("You must provide an orgId to create a league.");
  }

  try {
    const createdLeague = await db
      .loadModel("league")
      .create({ leagueName, orgId, status });
    return res.json(createdLeague);
  } catch (err) {
    return res
      .status(500)
      .json(
        "Something went wrong creating the league. Please try again later."
      );
  }
};
