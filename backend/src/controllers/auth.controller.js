// THIS IS MULTIPLE EXPORT. HERE WE ARE EXPORTING MULTIPLE THINGS
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/genToken.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await new User({
    fullName: fullName,
    email: email,
    password: hashPassword,
  });

  genToken(newUser._id, res);
  await newUser.save();

  res.status(200).json({
    _id: newUser._id,
    fullName: newUser.fullName,
    email: newUser.email,
    profilePic: newUser.profilePic,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400).json({
      message: "Invalid Credentials",
    });
  }

  const isCorrect = await bcrypt.compare(password, user.password);
  if (!isCorrect) {
    res.status(400).json({ message: "Invalid Credentials" });
  }
  genToken(user._id, res);
  res.status(200).json({
    message: "Login successfulf",
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profilePic: user.profilePic,
  });
};

export const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logout successfulf" });
};

export const updateProfile = async (req, res) => {
  const { profilePic } = req.body;
  const userId = req.user._id;

  if (!profilePic) {
    res.status(400).json({ message: "profile pic is required" });
  }

  const response = await cloudinary.uploader.upload(profilePic);
  const updateUser = await User.findByIdAndUpdate(
    userId,
    { profilePic: response.secure_url },
    { new: true }
  );
  res.send(200).json(updateUser);
};

export const checkAuth = (req, res) => {
  res.status(200).json(req.user);
};