const express = require("express");
const DB_anime = require("../../DB_codes/DB_auth");
const router = express.Router({ mergeParams: true });
const cart = require("../../model/cart");
router.get("/", (req, res) => {
  console.log("qaqx");
  cart.clear_cart();
  req.session.destroy();
  res.render("index");
});

module.exports = router;
