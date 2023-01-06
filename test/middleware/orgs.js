const { assert } = require("chai");
const sinon = require("sinon");

const db = require("../../lib/db");
const orgsMiddleware = require("../../middleware/orgs");

describe("loadOrg", () => {
  let orgStub = { findByPk: sinon.stub() };

  beforeEach(() => {
    sinon.stub(db, "loadModel").returns(orgStub);
  });

  afterEach(() => db.loadModel.restore());

  it("should throw an error for no orgId", () => {
    const req = { params: { orgId: null } },
      res = { json: sinon.stub(), status: sinon.stub().returnsThis() },
      next = sinon.stub();
    orgsMiddleware.loadOrg(req, res, next);
    assert.equal(
      res.status.args[0][0],
      400,
      "the correct status code was returned"
    );
    assert.equal(
      res.json.args[0][0],
      "You must provide the following required parameters: orgId",
      "the correct response was returned"
    );
  });

  it("should handle db error when loading org", (done) => {
    const req = { params: { orgId: 1 } },
      res = { json: sinon.stub(), status: sinon.stub().returnsThis() },
      next = sinon.stub();
    orgStub.findByPk.returns(Promise.reject(new Error("i am error")));
    orgsMiddleware
      .loadOrg(req, res, next)
      .then(() => {
        assert.equal(
          orgStub.findByPk.args[0][0],
          req.params.orgId,
          "the correct args were passed"
        );
        assert.equal(
          res.status.args[0][0],
          500,
          "the correct status code was returned"
        );
        assert.equal(
          res.json.args[0][0],
          "Something went wrong loading the org. Please try again later.",
          "the correct response was returned"
        );
        done();
      })
      .catch((err) => done(err));
  });

  it("should handle no exisiting org", (done) => {
    const req = { params: { orgId: 1 } },
      res = { json: sinon.stub(), status: sinon.stub().returnsThis() },
      next = sinon.stub();
    orgStub.findByPk.returns(null);
    orgsMiddleware
      .loadOrg(req, res, next)
      .then(() => {
        assert.equal(
          res.status.args[0][0],
          404,
          "the correct status code was returned"
        );
        assert.equal(
          res.json.args[0][0],
          `There is no org for id: ${req.params.orgId}`,
          "the correct response was returned"
        );
        done();
      })
      .catch((err) => done(err));
  });

  it("should load org on req object", (done) => {
    let req = { params: { orgId: 1 }, org: null };
    const res = { json: sinon.stub(), status: sinon.stub().returnsThis() },
      next = sinon.stub();
    orgStub.findByPk.returns(Promise.resolve("loaded org"));
    orgsMiddleware
      .loadOrg(req, res, next)
      .then(() => {
        assert.equal(
          req.org,
          "loaded org",
          "the org was loaded on the req object"
        );
        assert.equal(next.callCount, 1, "next was called");
        done();
      })
      .catch((err) => done(err));
  });
});
