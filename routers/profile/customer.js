const express = require("express");
const bcrypt = require("bcrypt");
const DB_auth = require("../../DB_codes/DB_auth");
const DB_menu = require("../../DB_codes/DB_menu");
const DB_customer = require("../../DB_codes/DB_customer");
const DB_order = require("../../DB_codes/DB_order");

const router = express.Router({ mergeParams: true });
const cart = require("../../model/cart");
const rating = require("../../model/rating");



router.get("/customer_profile", async (req, res) => {
  username= req.session.userid;
  let custome = await DB_auth.getUserByUsername(username);
  let customer = custome[0];

  
    const data = {
      isAuth: req.session.isAuth,
      username: req.session.userid,
      customer,
    };
    res.render("customer_profile", data);
  }
);
 


router.get("/adminprofile", async (req, res) => {
  username = req.session.userid;
  let custome = await DB_auth.getUserByAdminUsername(username);
  let customer = custome[0];

  const data = {
    isAuth: req.session.isAuth,
    username: req.session.userid,
    admin:customer,
  };
  res.render("admin_profile", data);
});
 



router.get("/editprofilecustom", async (req, res) => {
  username= req.session.userid;
  let custome = await DB_auth.getUserByUsername(username);
  let customer = custome[0];

  
    const data = {
      isAuth: req.session.isAuth,
      username: req.session.userid,
      customer,
    };
    res.render("edit_profile_customer", data);
  }
);
 




module.exports = router;
