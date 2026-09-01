const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generateTokens = require("../utils/generateTokens");

const access_token = "token";

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and name are required!",
      });
    }

    const isUserExists = await userModel.findOne({ email });
    if (isUserExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const userobj = user.toObject();
    delete userobj.password;

    if (!userobj) {
      return res.status(400).json({
        success: false,
        message: "failed to register user",
      });
    }

    const token = generateTokens(userobj);

    res.cookie(access_token, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "registration successful",
      user: userobj,
    });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Email or Password" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password,
    );
    if (!isPasswordCorrect) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Email or Password" });
    }

    const token = generateTokens(user);

    res.cookie(access_token, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const userobj = user.toObject();
    delete userobj.password;

    return res.status(200).json({
      success: true,
      message: "login successful",
      user: userobj,
    });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie(access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};

const me = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.user).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: user.toObject(),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { register, login, logout, me };
