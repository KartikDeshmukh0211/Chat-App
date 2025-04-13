import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import wrapAsync from "../utils/wrapAsync.js";
import { validateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", wrapAsync(signup));
router.post("/login", wrapAsync(login));
router.post("/logout", wrapAsync(logout));
router.put("/update-profile", validateUser, wrapAsync(updateProfile));
router.get("/check", validateUser, checkAuth);

export default router;
