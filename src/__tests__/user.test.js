const request = require("supertest");
const app = require("../../server");
const dateNow = new Date();

let user = {
  userName: "nathan_doe",
  accountNumber: 1238990,
  emailAddress: "nathan.doe@example.com",
  identityNumber: "9998767",
  createdAt: dateNow,
  updatedAt: dateNow,
};

describe("User testing", () => {
  // testing register error
  describe("register error when data is null", () => {
    test("should return error when username is null", (done) => {
      request(app)
        .post("/user")
        .send({
          userName: "nathan_doe",
          accountNumber: 1238990,
          emailAddress: "nathan.doe@example.com",
          identityNumber: "9998767",
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toContain("username cannot null");
          done();
        })
        .catch((err) => {
          console.log(err);
          done(err);
        });
    });
    test("should return error when email is null", (done) => {
      request(app)
        .post("/user")
        .send({
          userName: "nathan_doe",
          accountNumber: 1238990,
          emailAddress: "nathan.doe@example.com",
          identityNumber: "9998767",
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toContain("email cannot null");
          done();
        })
        .catch((err) => {
          console.log(err);
          done(err);
        });
    });
  });

  describe("regiter error when data is empty", () => {
    test("should return error when username is empty", (done) => {
      request(app)
        .post("/user")
        .send({
          userName: "nathan_doe",
          accountNumber: 1238990,
          emailAddress: "nathan.doe@example.com",
          identityNumber: "9998767",
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toContain("username cannot empty");
          done();
        })
        .catch((err) => {
          console.log(err);
          done(err);
        });
    });
    test("should return error when email is empty", (done) => {
      request(app)
        .post("/user")
        .send({
          userName: "nathan_doe",
          accountNumber: 1238990,
          emailAddress: "nathan.doe@example.com",
          identityNumber: "9998767",
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toContain("email cannot empty");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("register error when username is already exists", () => {
    test("should return error when username is already exists", (done) => {
      request(app)
        .post("/user")
        .send(user)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toContain("username is already exists");
          done();
        })
        .catch((err) => {
          console.log(err);
          done(err);
        });
    });
  });

  // testing login error
  describe("login error", () => {
    test("should return error when email is null/empty", (done) => {
      request(app)
        .post("/login")
        .send({
          userName: "nathan_doe",
          emailAddress: "",
        })
        .expect(401)
        .then(({ body }) => {
          expect(body.message).toContain("Invalid email or password");
          done();
        })
        .catch((err) => {
          console.log(err);
          done(err);
        });
    });
    test("should return error when username is null/empty", (done) => {
      request(app)
        .post("/login")
        .send({
          userName: "",
          emailAddress: "nathan.doe@example.com",
        })
        .expect(401)
        .then(({ body }) => {
          expect(body.message).toContain("Invalid email or password");
          done();
        })
        .catch((err) => {
          console.log(err);
          done(err);
        });
    });
    test("should return error when input email is wrong", (done) => {
      request(app)
        .post("/login")
        .send({
          userName: "nathan_doe",
          emailAddress: "nathan.doe@example.co",
        })
        .expect(401)
        .then(({ body }) => {
          expect(body.message).toContain("Invalid email or password");
          done();
        })
        .catch((err) => {
          console.log(err);
          done(err);
        });
    });
    test("should return error when input username is wrong", (done) => {
      request(app)
        .post("/login")
        .send({
          userName: "nathan",
          emailAddress: "nathan.doe@example.com",
        })
        .expect(401)
        .then(({ body }) => {
          expect(body.message).toContain("Invalid email or password");
          done();
        })
        .catch((err) => {
          console.log(err);
          done(err);
        });
    });
  });

  // testing success register
  describe("success register", () => {
    test("should return user data when success register", (done) => {
      request(app)
        .post("/user")
        .send({
          userName: "nathan_doe",
          accountNumber: 1238990,
          emailAddress: "nathan.doe@example.com",
          identityNumber: "9998767",
        })
        .expect(201)
        .then(({ body }) => {
          expect(body).toHaveProperty("Id", body.Id);
          expect(body).toHaveProperty("userName", body.userName);
          expect(body).toHaveProperty("emailAdress", body.emailAddress);
          expect(body).toHaveProperty("accountNumber", body.accountNumber);
          expect(body).toHaveProperty("identityNumber", body.identityNumber);
          done();
        })
        .catch((err) => {
          console.log(err);
          done(err);
        });
    });
  });

  // testing succes login
  describe("login error", () => {
    test("should return access_token when success login ", (done) => {
      request(app)
        .post("/login")
        .send({
          userName: user.userName,
          emailAddress: emailAddress,
        })
        .expect(200)
        .then(({ body }) => {
          expect(body).toHaveProperty("access_token", expect.any(String));
          done();
        })
        .catch((err) => {
          console.log(err);
          done(err);
        });
    });
  });
});
