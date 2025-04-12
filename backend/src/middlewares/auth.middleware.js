import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const validateUser = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    res.status(401).json({ message: "Unauthorized user. Has no tokens" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    res.status(401).json({ message: "Unauthorized user. Invalid Token" });
  }

  const user = await User.findById(decoded.userId).select("-password");

  if (!user) {
    res.status(404).json({ message: "User not found" });
  }

  req.user = user;
  next();
};
