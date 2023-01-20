const { assert } = require("chai");
const bcrypt = require("bcryptjs");
const sinon = require("sinon");

const db = require("../../lib/db");
const { signup } = require("../../controllers/auth");

describe("auth controllers", () => {
  describe("signup", () => {
    let userStub = { create: sinon.stub() };

    beforeEach(() => {
      sinon.stub(bcrypt, "hash").returns("hashed password");
      sinon.stub(db, "loadModel").returns(userStub);
    });

    afterEach(() => {
      bcrypt.hash.restore();
      db.loadModel.restore();
    });

    it("should handle db error when creating user", (done) => {
      const req = {
          body: {
            firstName: "John",
            lastName: "Doe",
            email: "test@test.com",
            role: "admin",
            status: "pending",
            password: "password",
          },
        },
        res = { json: sinon.stub(), status: sinon.stub().returnsThis() },
        next = sinon.stub();
      userStub.create.returns(Promise.reject(new Error("i am error")));

      signup(req, res, next)
        .then(() => {
          assert.deepEqual(
            bcrypt.hash.args[0],
            [req.body.password, 12],
            "the correct args were passed"
          );
          assert.deepEqual(
            userStub.create.args[0][0],
            {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              role: req.body.role,
              status: req.body.status,
              password: "hashed password",
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
            "Something went wrong signing up the user. Please try again later.",
            "the correct response was returned"
          );
          done();
        })
        .catch((err) => done(err));
    });

    it("should return signed up user", (done) => {
      const req = {
          body: {
            firstName: "John",
            lastName: "Doe",
            email: "test@test.com",
            role: "admin",
            status: "pending",
            password: "password",
          },
        },
        res = { json: sinon.stub(), status: sinon.stub().returnsThis() },
        next = sinon.stub();
      userStub.create.returns(Promise.resolve("signed up user"));

      signup(req, res, next)
        .then(() => {
          assert.equal(
            res.status.args[0][0],
            201,
            "the correct status code was returned"
          );
          assert.equal(
            res.json.args[0][0],
            "signed up user",
            "the correct response was returned"
          );
          done();
        })
        .catch((err) => done(err));
    });
  });
});
