const express = require("express");
const bcrypt = require("bcrypt");
const DB_auth = require("../../DB_codes/DB_auth");
const DB_menu = require("../../DB_codes/DB_menu");
const DB_table = require("../../DB_codes/DB_table");
const router = express.Router({ mergeParams: true });
const cart = require("../../model/cart");

router.get("/", async (req, res) => {
  res.render("transaction1");
});

router.get("/transaction/:num", async (req, res) => {
  num = req.params.num;

  let orders = await DB_table.gettransAdmin(num * 1);

  final = [];

  for (let i = 0; i < orders.length; i++) {
    let inor = await DB_table.getFOODS(orders[i].ORDER_ID);

    let customer = await DB_auth.getCustomerbyid(orders[i].CUSTOMER_ID);

    cartt = [];
    let total = 0;
    let tqt = 0;
    for (let i = 0; i < inor.length; i++) {
      (total += inor[i].QUANTITY * inor[i].FINALPRICE),
        (tqt += inor[i].QUANTITY),
        cartt.push({
          foodname: inor[i].FOOD_NAME,
          price: inor[i].FINALPRICE,
          quantity: inor[i].QUANTITY,
          fprice: inor[i].QUANTITY * inor[i].FINALPRICE,
        });
    }

    final.push({
      customer: customer[0],
      cat: cartt,
      orderid: orders[i].ORDER_ID,
      date: orders[i].TIME_OF_ORDER,
      payment: orders[i].PAYMENT,
      total: total,
      tqt: tqt,
    });
  }

  const data = {
    isAuth: req.session.isAuth,
    username: req.session.userid,
    final: final,
  };
  //  if (cart.totalPrice != 0) cart.clear_cart();

  res.render("transactions_details");
});

module.exports = router;
