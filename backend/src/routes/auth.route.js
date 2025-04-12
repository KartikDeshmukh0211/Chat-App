import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
import wrapAsync from "../utils/wrapAsync.js";

const router = express.Router();

router.post("/signup", wrapAsync(signup));
router.post("/login", wrapAsync(login));
router.post("/logout", wrapAsync(logout));

export default router;
