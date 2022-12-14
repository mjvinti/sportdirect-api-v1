const { assert } = require("chai");
const sinon = require("sinon");

const db = require("../../lib/db");
const { postCreateTeam } = require("../../controllers/teams");

describe("teams controllers", () => {
  describe("postCreateTeam", () => {
    let teamStub = { create: sinon.stub() };

    beforeEach(() => {
      sinon.stub(db, "loadModel").returns(teamStub);
    });

    afterEach(() => db.loadModel.restore());

    it("should handle db error when creating team", (done) => {
      const req = {
          body: { orgId: 1, teamName: "Solar Bears", status: "active" },
        },
        res = { json: sinon.stub(), status: sinon.stub().returnsThis() },
        next = sinon.stub();
      teamStub.create.returns(Promise.reject(new Error("i am error")));

      postCreateTeam(req, res, next)
        .then(() => {
          assert.deepEqual(
            teamStub.create.args[0][0],
            {
              orgId: req.body.orgId,
              teamName: req.body.teamName,
              status: req.body.status,
            },
            "the correct args were passed"
          );
          assert.equal(
            res.status.args[0][0],
            500,
            "the correct status code was returned"
          );
          assert.equal(
            res.json.args[0][0],
            "Something went wrong creating the team. Please try again later.",
            "the correct response was returned"
          );
          done();
        })
        .catch((err) => done(err));
    });

    it("should return created team", (done) => {
      const req = {
          body: { orgId: 1, teamName: "Solar Bears", status: "active" },
        },
        res = { json: sinon.stub(), status: sinon.stub().returnsThis() },
        next = sinon.stub();
      teamStub.create.returns(Promise.resolve("created team"));

      postCreateTeam(req, res, next)
        .then(() => {
          assert.equal(
            res.json.args[0][0],
            "created team",
            "the correct response was returned"
          );
          done();
        })
        .catch((err) => done(err));
    });
  });
});
