// THIS IS MULTIPLE EXPORT. HERE WE ARE EXPORTING MULTIPLE THINGS
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/genToken.js";

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

  res.status(400).json({
    _id: newUser._id,
    fullName: newUser.fullName,
    email: newUser.email,
    profilePic: newUser.profilePic,
  });
};

export const login = (req, res) => {
  res.send("login user");
};
export const logout = (req, res) => {
  res.send("logout user");
};
