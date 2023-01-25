const { assert } = require("chai");
const sinon = require("sinon");

const db = require("../../lib/db");
const {
  deleteOrgById,
  getOrgById,
  postCreateOrg,
  postCreateOrgLeague,
  putUpdateOrgById,
} = require("../../controllers/orgs");

describe("orgs controllers", () => {
  describe("postCreateOrg", () => {
    let userStub = { createOrg: sinon.stub() };

    it("should handle db error when creating org", (done) => {
      const req = {
          user: userStub,
          body: { orgName: "SportDirect", sport: "hockey", status: "active" },
        },
        res = { json: sinon.stub(), status: sinon.stub().returnsThis() },
        next = sinon.stub();
      userStub.createOrg.returns(Promise.reject(new Error("i am error")));

      postCreateOrg(req, res, next)
        .then(() => {
          assert.deepEqual(
            userStub.createOrg.args[0][0],
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
          user: userStub,
          body: { orgName: "SportDirect", sport: "hockey", status: "active" },
        },
        res = { json: sinon.stub(), status: sinon.stub().returnsThis() },
        next = sinon.stub();
      userStub.createOrg.returns(Promise.resolve("created org"));

      postCreateOrg(req, res, next)
        .then(() => {
          assert.equal(
            res.status.args[0][0],
            201,
            "the correct status code was returned"
          );
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

  describe("getOrgById", () => {
    it("should return loaded org", () => {
      const req = { org: "loaded org" },
        res = { json: sinon.stub(), status: sinon.stub().returnsThis() },
        next = sinon.stub();

      getOrgById(req, res, next);
      assert.equal(
        res.json.args[0][0],
        "loaded org",
        "the correct response was returned"
      );
    });
  });

  describe("putUpdateOrgById", () => {
    it("should handle db error when updating org", (done) => {
      const req = {
          body: { orgName: "SportDirect", sport: "hockey", status: "active" },
          org: {
            update: sinon
              .stub()
              .returns(Promise.reject(new Error("i am error"))),
          },
        },
        res = { json: sinon.stub(), status: sinon.stub().returnsThis() },
        next = sinon.stub();

      putUpdateOrgById(req, res, next)
        .then(() => {
          assert.deepEqual(
            req.org.update.args[0][0],
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
            "Something went wrong updating the org. Please try again later.",
            "the correct response was returned"
          );
          done();
        })
        .catch((err) => done(err));
    });

    it("should return the updated org", (done) => {
      const req = {
          body: { orgName: "SportDirect", sport: "hockey", status: "active" },
          org: {
            update: sinon.stub().returns(Promise.resolve("updated org")),
          },
        },
        res = { json: sinon.stub(), status: sinon.stub().returnsThis() },
        next = sinon.stub();

      putUpdateOrgById(req, res, next)
        .then(() => {
          assert.equal(
            res.json.args[0][0],
            "updated org",
            "the correct response was returned"
          );
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe("deleteOrgById", () => {
    it("should handle db error when deleting org", (done) => {
      const req = {
          org: {
            destroy: sinon
              .stub()
              .returns(Promise.reject(new Error("i am error"))),
          },
        },
        res = { json: sinon.stub(), status: sinon.stub().returnsThis() },
        next = sinon.stub();

      deleteOrgById(req, res, next)
        .then(() => {
          assert.deepEqual(
            req.org.destroy.callCount,
            1,
            "destroy was called once"
          );
          assert.equal(
            res.status.args[0][0],
            500,
            "the correct status code was returned"
          );
          assert.equal(
            res.json.args[0][0],
            "Something went wrong deleting the org. Please try again later.",
            "the correct response was returned"
          );
          done();
        })
        .catch((err) => done(err));
    });

    it("should handle deleting org", (done) => {
      const req = {
          org: {
            destroy: sinon.stub().returns(Promise.resolve([])),
          },
        },
        res = { json: sinon.stub(), status: sinon.stub().returnsThis() },
        next = sinon.stub();

      deleteOrgById(req, res, next)
        .then(() => {
          assert.deepEqual(
            res.json.args[0][0],
            [],
            "the correct response was returned"
          );
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe("postCreateOrgLeague", () => {
    it("should handle db error when creating league", (done) => {
      const req = {
          body: { leagueName: "test league", status: "active" },
          org: {
            createLeague: sinon
              .stub()
              .returns(Promise.reject(new Error("i am error"))),
          },
        },
        res = { json: sinon.stub(), status: sinon.stub().returnsThis() },
        next = sinon.stub();

      postCreateOrgLeague(req, res, next)
        .then(() => {
          assert.deepEqual(
            req.org.createLeague.args[0][0],
            { leagueName: req.body.leagueName, status: req.body.status },
            "the correct args passed"
          );
          assert.equal(
            res.status.args[0][0],
            500,
            "the correct status code was returned"
          );
          assert.equal(
            res.json.args[0][0],
            "Something went wrong creating the league. Please try again later.",
            "the correct response was returned"
          );
          done();
        })
        .catch((err) => done(err));
    });

    it("should handle creating league", (done) => {
      const req = {
          body: { leagueName: "test league", status: "active" },
          org: {
            createLeague: sinon
              .stub()
              .returns(Promise.resolve("created league")),
          },
        },
        res = { json: sinon.stub(), status: sinon.stub().returnsThis() },
        next = sinon.stub();

      postCreateOrgLeague(req, res, next)
        .then(() => {
          assert.equal(
            res.status.args[0][0],
            201,
            "the correct status code was returned"
          );
          assert.deepEqual(
            res.json.args[0][0],
            "created league",
            "the correct response was returned"
          );
          done();
        })
        .catch((err) => done(err));
    });
  });
});
