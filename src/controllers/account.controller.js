const accountModel = require("../models/account.model");

const createAccountController = async (req, res) => {
  try {
    const user = req.user;

    const account = await accountModel.create({
      user: user._id,
    });

    return res.status(201).json({
      account,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createAccountController };
