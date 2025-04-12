// const express = require("express"); // type=commonjs

import express from "express"; // FOR USING IMPORT STATEMENT, MAKE TYPE=MODULE IN PACKAGE.JSON
const app = express();
let port = 3000;

import authRoutes from "./routes/auth.route.js";

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("App is working");
});

app.listen(port, () => {
  console.log(`server is running at the port ${port}`);
});
