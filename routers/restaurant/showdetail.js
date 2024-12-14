const express = require("express");
const bcrypt = require("bcrypt");
const DB_auth = require("../../DB_codes/DB_auth");
const DB_menu = require("../../DB_codes/DB_menu");
const router = express.Router({ mergeParams: true });
const cart = require("../../model/cart");

router.get("/:name", async (req, res) => {
  
  n=req.params.name;
  console.log(n);
  let t;
  if(n=='burger')
  {
    t=1;
  }
  else if(n=='candle_cafe')
  {t=2;}
  else if(n=='Chinese_Mystic')
  {
    t=3;
  }
  else if (n == "Steak_N_Dine") {
    t = 4;
  }
  let burger = [];
  let special = [];
  burger = await DB_menu.getMenuByID(t, 0);
  special = await DB_menu.getMenuByID(t, 1);
  pop = await DB_menu.getPopular(t);

  const data = {
    isAuth: req.session.isAuth,
    username: req.session.userid,
    pop,
    name:n,
    burger,
    special,
  };
  //  if (cart.totalPrice != 0) cart.clear_cart();
  res.render("menuburger_admin", data);
});

module.exports = router;
