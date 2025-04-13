import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";
import { validateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/users", validateUser, wrapAsync(getUsersForSidebar));
router.get("/:id", validateUser, wrapAsync(getMessages));
router.post("/send/:id", validateUser, wrapAsync(sendMessage));

export default router;
