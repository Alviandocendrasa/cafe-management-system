const express = require("express");
const { login } = require("../handlers/authHandler");

const router = express.Router();

router.post("/login", login);

module.exports = router;