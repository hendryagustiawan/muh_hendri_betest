const { encodeData } = require("../helpers/jwt");
const User = require("../models/UserModel");

async function register(req, res, next) {
  const { userName, accountNumber, emailAddress, identityNumber } = req.body;

  try {
    const usernameExists = await User.findOne({ userName });

    if (usernameExists) {
      next({ name: `Username already registered` });
    }

    const newUser = await User.create({
      userName,
      accountNumber,
      emailAddress,
      identityNumber,
    });

    res.status(201).json({
      id: newUser.id,
      userName: newUser.userName,
      accountNumber: newUser.accountNumber,
      emailAddress: newUser.emailAddress,
      identityNumber: newUser.identityNumber,
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  const { userName, emailAddress } = req.body;

  if (!userName && !emailAddress) {
    return next({ name: "ValidationError", message: "Username and Email are required" });
  } else if (!userName) {
    return next({ name: "ValidationError", message: "Username is required" });
  } else if (!emailAddress) {
    return next({ name: "ValidationError", message: "Email is required" });
  }

  try {
    const data = await User.findOne({ userName });

    if (data) {
      let access_token = encodeData({
        Id: data.Id,
        userName: data.userName,
      });
      res.status(200).json({ access_token });
    } else {
      throw { name: "InvalidUser", message: "Invalid user" };
    }
  } catch (error) {
    next(error);
  }
}

async function read(req, res, next) {
  try {
    const user = await User.find();

    res.status(200).json({
      user,
    });
  } catch (error) {
    next(error);
  }
}

async function getUserByAccountNumber(req, res, next) {
  const { accountNumber } = req.params;

  try {
    const user = await User.findOne({ accountNumber });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      id: user.id,
      userName: user.userName,
      accountNumber: user.accountNumber,
      emailAddress: user.emailAddress,
      identityNumber: user.identityNumber,
    });
  } catch (error) {
    next(error);
  }
}

async function getUserByIdentityNumber(req, res, next) {
  const { identityNumber } = req.params;

  try {
    const user = await User.findOne({ identityNumber });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      id: user.id,
      userName: user.userName,
      accountNumber: user.accountNumber,
      emailAddress: user.emailAddress,
      identityNumber: user.identityNumber,
    });
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  const { id } = req.params;
  const { userName, accountNumber, emailAddress, identityNumber } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (userName) user.userName = userName;
    if (accountNumber) user.accountNumber = accountNumber;
    if (emailAddress) user.emailAddress = emailAddress;
    if (identityNumber) user.identityNumber = identityNumber;

    await user.save();

    res.status(200).json({
      id: user.id,
      userName: user.userName,
      accountNumber: user.accountNumber,
      emailAddress: user.emailAddress,
      identityNumber: user.identityNumber,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  read,
  update,
  deleteUser,
  getUserByAccountNumber,
  getUserByIdentityNumber,
  login,
};
