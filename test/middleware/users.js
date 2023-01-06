const { assert } = require("chai");
const sinon = require("sinon");

const db = require("../../lib/db");
const { loadUser } = require("../../middleware/users");

describe("loadUser", () => {
  let userStub = { findByPk: sinon.stub() };

  beforeEach(() => {
    sinon.stub(db, "loadModel").returns(userStub);
  });

  afterEach(() => db.loadModel.restore());

  it("should throw an error for no userId", () => {
    const req = { params: { userId: null } },
      res = { json: sinon.stub(), status: sinon.stub().returnsThis() },
      next = sinon.stub();
    loadUser(req, res, next);
    assert.equal(
      res.status.args[0][0],
      400,
      "the correct status code was returned"
    );
    assert.equal(
      res.json.args[0][0],
      "You must provide the following required parameters: userId",
      "the correct response was returned"
    );
  });

  it("should handle db error when loading user", (done) => {
    const req = { params: { userId: 1 } },
      res = { json: sinon.stub(), status: sinon.stub().returnsThis() },
      next = sinon.stub();
    userStub.findByPk.returns(Promise.reject(new Error("i am error")));

    loadUser(req, res, next)
      .then(() => {
        assert.equal(
          userStub.findByPk.args[0][0],
          req.params.userId,
          "the correct args were passed"
        );
        assert.equal(
          res.status.args[0][0],
          500,
          "the correct status code was returned"
        );
        assert.equal(
          res.json.args[0][0],
          "Something went wrong loading the user. Please try again later.",
          "the correct response was returned"
        );
        done();
      })
      .catch((err) => done(err));
  });

  it("should handle no exisiting user", (done) => {
    const req = { params: { userId: 1 } },
      res = { json: sinon.stub(), status: sinon.stub().returnsThis() },
      next = sinon.stub();
    userStub.findByPk.returns(null);

    loadUser(req, res, next)
      .then(() => {
        assert.equal(
          res.status.args[0][0],
          404,
          "the correct status code was returned"
        );
        assert.equal(
          res.json.args[0][0],
          `There is no user for id: ${req.params.userId}`,
          "the correct response was returned"
        );
        done();
      })
      .catch((err) => done(err));
  });

  it("should load user on req object", (done) => {
    let req = { params: { userId: 1 }, user: null };
    const res = { json: sinon.stub(), status: sinon.stub().returnsThis() },
      next = sinon.stub();
    userStub.findByPk.returns(Promise.resolve("loaded user"));

    loadUser(req, res, next)
      .then(() => {
        assert.equal(
          req.user,
          "loaded user",
          "the user was loaded on the req object"
        );
        assert.equal(next.callCount, 1, "next was called");
        done();
      })
      .catch((err) => done(err));
  });
});
