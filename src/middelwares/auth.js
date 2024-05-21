const { decodeData } = require("../helpers/jwt");
const User = require("../models/UserModel");

const authentication = (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw { name: "TokenRequired", message: "Access token is required" };
    } else {
      const decode = decodeData(access_token);

      req.userData = decode;

      const { userName } = req.userData;

      User.findOne({ userName })
        .then((user) => {
          if (user) {
            next();
          } else {
            throw { name: "UserNotFound", message: "User not found" };
          }
        })
        .catch((err) => {
          throw err;
        });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authentication,
};
