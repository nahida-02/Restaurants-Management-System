const express = require("express");
const bcrypt = require("bcrypt");
const DB_auth = require("../../DB_codes/DB_auth");
const DB_menu = require("../../DB_codes/DB_menu");
const DB_customer = require("../../DB_codes/DB_customer");
const DB_order = require("../../DB_codes/DB_order");

const router = express.Router({ mergeParams: true });
const cart = require("../../model/cart");
const rating = require("../../model/rating");

router.post("/:name", async (req, res) => {
  const { foodid, foodname, name, text } = req.body;

  username = req.session.userid;
  let customer = await DB_auth.getUserByUsername(username);
  let cust = customer[0].ID;

  await DB_order.insertreview(
    cust * 1,
    foodid * 1,
    text,
    customer[0].NAME,
    foodname
  );
});

router.get("/save/:name", async (req, res) => {
  n = req.params.name;
  res.redirect("/menu_burger/" + n);
});

router.get("/show/:name", async (req, res) => {
  n = req.params.name;
  let t;
  if (n == "burger") {
    t = 1;
  }
  if (n == "candle_cafe") {
    t = 2;
  }
  if (n == "Chinese_Mystic") {
    t = 3;
  }

  if (n == "Steak_N_Dine") {
    t = 4;
  }

  let reviews = await DB_order.getreview(t);

  const data = {
    isAuth: req.session.isAuth,
    username: req.session.userid,
    name: n,

    reviews,
  };
  // if (cart.totalPrice != 0) cart.clear_cart();
  res.render("reviews", data);

  //res.redirect("/menu_burger/" + n);
});

module.exports = router;
