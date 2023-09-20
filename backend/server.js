const express = require("express");
const bcrypt = require("bcrypt");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const Router = require("./service/route.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//Common routes

app.use("/", Router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
