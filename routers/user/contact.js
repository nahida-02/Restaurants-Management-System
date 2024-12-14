const express = require("express");
const bcrypt = require("bcrypt");
const DB_auth = require("../../DB_codes/DB_auth");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  res.render("contact");
});

module.exports = router;
