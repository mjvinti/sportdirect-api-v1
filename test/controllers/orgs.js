const { assert } = require("chai");
const sinon = require("sinon");

const db = require("../../lib/db");
const { postCreateOrg } = require("../../controllers/orgs");

describe("orgs controllers", () => {
  describe("postCreateOrg", () => {
    let orgStub = { create: sinon.stub() };

    beforeEach(() => {
      sinon.stub(db, "loadModel").returns(orgStub);
    });

    afterEach(() => db.loadModel.restore());

    it("should handle db error when creating org", (done) => {
      const req = {
          body: { orgName: "SportDirect", sport: "hockey", status: "active" },
        },
        res = { json: sinon.stub(), status: sinon.stub().returnsThis() },
        next = sinon.stub();
      orgStub.create.returns(Promise.reject(new Error("i am error")));

      postCreateOrg(req, res, next)
        .then(() => {
          assert.deepEqual(
            orgStub.create.args[0][0],
            {
              orgName: req.body.orgName,
              sport: req.body.sport,
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
            "Something went wrong creating the org. Please try again later.",
            "the correct response was returned"
          );
          done();
        })
        .catch((err) => done(err));
    });

    it("should return created org", (done) => {
      const req = {
          body: { orgName: "SportDirect", sport: "hockey", status: "active" },
        },
        res = { json: sinon.stub(), status: sinon.stub().returnsThis() },
        next = sinon.stub();
      orgStub.create.returns(Promise.resolve("created org"));

      postCreateOrg(req, res, next)
        .then(() => {
          assert.equal(
            res.json.args[0][0],
            "created org",
            "the correct response was returned"
          );
          done();
        })
        .catch((err) => done(err));
    });
  });
});
