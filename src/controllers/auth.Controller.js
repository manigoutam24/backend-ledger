const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const emailService = require("../services/email.service");

/*
 * User Register controler
 *POST /api/auth/register
 */
const registerUser = async (req, res) => {
  const { email, name, password } = req.body;

  const isExists = await userModel.findOne({
    email: email,
  });

  if (isExists) {
    return res.status(422).json({
      success: false,
      message: "User already exist.",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    email,
    password: hash,
    name,
  });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.cookie("token", token);

  res.status(201).json({
    success: true,
    message: "User register successfully",
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
    },
    token,
  });

  await emailService.sendRegistrationEmail(user.email, user.name);
};

/*
 * User Login controler
 *POST /api/auth/login
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  //   console.log(password);

  const user = await userModel
    .findOne({
      email,
    })
    .select("+password");

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Email or password is INVALID",
    });
  }

  //   console.log(user.password);

  const isPasswordCompare = await bcrypt.compare(password, user.password);

  // console.log(password, user.password);

  if (!isPasswordCompare) {
    return res.status(401).json({
      success: false,
      message: "Email or password is INVALID",
    });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.cookie("token", token);

  return res.status(200).json({
    success: true,
    message: "User login successfully",
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
    },
    token,
  });
};

module.exports = { registerUser, loginUser };
