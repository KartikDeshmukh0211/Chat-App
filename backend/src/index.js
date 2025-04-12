// const express = require("express"); // type=commonjs

import express from "express"; // FOR USING IMPORT STATEMENT, MAKE TYPE=MODULE IN PACKAGE.JSON
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js";
import { connectDb } from "./lib/db.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
let port = process.env.PORT;

app.use(express.urlencoded({ extended: true })); // for reading the body of request when comed via post route.app
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("App is working");
});

app.listen(port, () => {
  console.log(`server is running at the port ${port}`);
  connectDb();
});
