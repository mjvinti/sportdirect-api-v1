const { assert } = require("chai");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sinon = require("sinon");

const db = require("../../lib/db");
const { login, signup } = require("../../controllers/auth");

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

  describe("login", () => {
    let userStub = { findOne: sinon.stub() };

    beforeEach(() => {
      sinon.stub(bcrypt, "compare");
      sinon.stub(db, "loadModel").returns(userStub);
      sinon.stub(jwt, "sign").returns("token");
      sinon.stub(process.env, "JWT_SECRET").value("secret");
    });

    afterEach(() => {
      bcrypt.compare.restore();
      db.loadModel.restore();
      jwt.sign.restore();
    });

    it("should handle db error when finding user", (done) => {
      const req = { body: { email: "test@test.com", password: "password" } },
        res = { json: sinon.stub(), status: sinon.stub().returnsThis() },
        next = sinon.stub();
      userStub.findOne.returns(Promise.reject(new Error("i am error")));

      login(req, res, next)
        .then(() => {
          assert.deepEqual(
            userStub.findOne.args[0][0],
            { where: { email: req.body.email } },
            "the correct args were passed"
          );
          assert.equal(
            res.status.args[0][0],
            500,
            "the correct status code was returned"
          );
          assert.equal(
            res.json.args[0][0],
            "Something went wrong logging in the user. Please try again later.",
            "the correct response was returned"
          );
          done();
        })
        .catch((err) => done(err));
    });

    it("should return 401 when no user found", (done) => {
      const req = { body: { email: "test@test.com", password: "password" } },
        res = { json: sinon.stub(), status: sinon.stub().returnsThis() },
        next = sinon.stub();
      userStub.findOne.returns(Promise.resolve(null));

      login(req, res, next)
        .then(() => {
          assert.equal(
            res.status.args[0][0],
            401,
            "the correct status code was returned"
          );
          assert.equal(
            res.json.args[0][0],
            `No user found with email: ${req.body.email}`,
            "the correct response was returned"
          );
          done();
        })
        .catch((err) => done(err));
    });

    it("should return 401 when password is incorrect", (done) => {
      const req = { body: { email: "test@test.com", password: "password" } },
        res = { json: sinon.stub(), status: sinon.stub().returnsThis() },
        next = sinon.stub();
      userStub.findOne.returns(
        Promise.resolve({ password: "not the same password" })
      );
      bcrypt.compare.returns(false);

      login(req, res, next)
        .then(() => {
          assert.deepEqual(
            bcrypt.compare.args[0],
            [req.body.password, "not the same password"],
            "the correct args were passed"
          );
          assert.equal(
            res.status.args[0][0],
            401,
            "the correct status code was returned"
          );
          assert.equal(
            res.json.args[0][0],
            "The password entered is incorrect. Please try again.",
            "the correct response was returned"
          );
          done();
        })
        .catch((err) => done(err));
    });

    it("should return token and user for successful login", (done) => {
      const req = { body: { email: "test@test.com", password: "password" } },
        res = { json: sinon.stub(), status: sinon.stub().returnsThis() },
        next = sinon.stub();
      userStub.findOne.returns(
        Promise.resolve({ password: "hashed password" })
      );
      bcrypt.compare.returns(true);

      login(req, res, next)
        .then(() => {
          assert.deepEqual(
            jwt.sign.args[0],
            [
              { user: { password: "hashed password" } },
              "secret",
              { expiresIn: "1h" },
            ],
            "the correct args were passed"
          );
          assert.equal(
            res.status.args[0][0],
            200,
            "the correct status code was returned"
          );
          assert.deepEqual(
            res.json.args[0][0],
            { token: "token", user: { password: "hashed password" } },
            "the correct response was returned"
          );
          done();
        })
        .catch((err) => done(err));
    });
  });
});
