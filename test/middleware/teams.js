const { assert } = require("chai");
const sinon = require("sinon");

const db = require("../../lib/db");
const { loadTeam } = require("../../middleware/teams");

describe("teams middleware", () => {
  describe("loadTeam", () => {
    let teamStub = { findByPk: sinon.stub() };

    beforeEach(() => {
      sinon.stub(db, "loadModel").returns(teamStub);
    });

    afterEach(() => db.loadModel.restore());

    it("should throw an error for no teamId", () => {
      const req = { params: { teamId: null } },
        res = { json: sinon.stub(), status: sinon.stub().returnsThis() },
        next = sinon.stub();
      loadTeam(req, res, next);
      assert.equal(
        res.status.args[0][0],
        400,
        "the correct status code was returned"
      );
      assert.equal(
        res.json.args[0][0],
        "You must provide the following required parameters: teamId",
        "the correct response was returned"
      );
    });

    it("should handle db error when loading team", (done) => {
      const req = { params: { teamId: 1 } },
        res = { json: sinon.stub(), status: sinon.stub().returnsThis() },
        next = sinon.stub();
      teamStub.findByPk.returns(Promise.reject(new Error("i am error")));

      loadTeam(req, res, next)
        .then(() => {
          assert.equal(
            teamStub.findByPk.args[0][0],
            req.params.teamId,
            "the correct args were passed"
          );
          assert.equal(
            res.status.args[0][0],
            500,
            "the correct status code was returned"
          );
          assert.equal(
            res.json.args[0][0],
            "Something went wrong loading the team. Please try again later.",
            "the correct response was returned"
          );
          done();
        })
        .catch((err) => done(err));
    });

    it("should handle no exisiting team", (done) => {
      const req = { params: { teamId: 1 } },
        res = { json: sinon.stub(), status: sinon.stub().returnsThis() },
        next = sinon.stub();
      teamStub.findByPk.returns(null);

      loadTeam(req, res, next)
        .then(() => {
          assert.equal(
            res.status.args[0][0],
            404,
            "the correct status code was returned"
          );
          assert.equal(
            res.json.args[0][0],
            `There is no team for id: ${req.params.teamId}`,
            "the correct response was returned"
          );
          done();
        })
        .catch((err) => done(err));
    });

    it("should load team on req object", (done) => {
      let req = { params: { teamId: 1 }, team: null };
      const res = { json: sinon.stub(), status: sinon.stub().returnsThis() },
        next = sinon.stub();
      teamStub.findByPk.returns(Promise.resolve("loaded team"));

      loadTeam(req, res, next)
        .then(() => {
          assert.equal(
            req.team,
            "loaded team",
            "the team was loaded on the req object"
          );
          assert.equal(next.callCount, 1, "next was called");
          done();
        })
        .catch((err) => done(err));
    });
  });
});
