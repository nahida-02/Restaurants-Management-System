const express = require("express");
const bcrypt = require("bcrypt");
const DB_auth = require("../../DB_codes/DB_auth");
const router = express.Router({ mergeParams: true });
const cart = require("../../model/cart");

router.get("/admin", async (req, res) => {
  res.render("admin_main");
});


router.get("/restaurants", async (req, res) => {
  
res.render("admin_main_restaurants");
});



router.get("/show_admin", async (req, res) => {

  let customers = [];
  admins = await DB_auth.getAdmin();
  console.log(customers);
  const data = {
    isAuth: req.session.isAuth,
    username: req.session.userid,

    admins,
  };
  res.render("admin_show_admin",data);
});


router.get("/show_customers", async (req, res) => {
let customers = [];
customers = await DB_auth.getCustomers();
console.log(customers);
const data = {
  isAuth: req.session.isAuth,
  username: req.session.userid,
  
  customers,
};

  res.render("admin_show_customers",data);
});


router.get("/order", async (req, res) => {
  res.render("admin_order");
});

router.get("/order_details", async (req, res) => {
  res.render("admin_details");
});













module.exports = router;
