const express = require("express");
const bcrypt = require("bcrypt");
const DB_auth = require("../../DB_codes/DB_auth");
const DB_menu = require("../../DB_codes/DB_menu");
const DB_customer = require("../../DB_codes/DB_customer");
const DB_order = require("../../DB_codes/DB_order");
const DB_table = require("../../DB_codes/DB_table");

const router = express.Router({ mergeParams: true });
const cart = require("../../model/cart");
const rating = require("../../model/rating");

router.get("/:name", async (req, res) => {
  let na = req.params.name;
  let aa = cart.getCart();
  if (aa.totalPrice == 0) {
    cart.clear_cart();
    res.redirect("/menu_burger/"+na);
  } else {
    username = req.session.userid;
    let customer = await DB_auth.getUserByUsername(username);
    let bkash_phone_no = await DB_customer.getBkashPhone(
      customer.ID,
      "PHONE_NO"
    );
    let credit_username = await DB_customer.getCreditInfo(
      customer.ID,
      "USERNAME"
    );

    let credit_bank = await DB_customer.getCreditInfo(customer.ID, "BANK");

    let credit_cardtype = await DB_customer.getCreditInfo(
      customer.ID,
      "CARD_TYPE"
    );

    let credit_cardno = await DB_customer.getCreditInfo(customer.ID, "CARD_NO");

    if (JSON.stringify(credit_username) === "{}") credit_username = "";
    if (JSON.stringify(credit_bank) === "{}") credit_bank = "";
    if (JSON.stringify(credit_cardtype) === "{}") credit_cardtype = "";
    if (JSON.stringify(credit_cardno) === "{}") credit_cardno = "";
    if (JSON.stringify(bkash_phone_no) === "{}") bkash_phone_no = "";

    let a = cart.getCart();

    const data = {
      isAuth: req.session.isAuth,
      username: req.session.userid,
      customer: customer[0],
      bkash_phone_no,
      credit_username,
      credit_bank,
      credit_cardtype,
      credit_cardno,

      foods: a.prod,
      total: a.totalPrice,
      name: na,
    };
    res.render("checkout", data);
  }
});

router.post("/confirm_payment", async (req, res) => {
  const {
    name,
    phone,
    email,
    city,
    address,
    restname,
    payment,
    cardname,
    bank,
    cardtype,
    cardnumber,
    bkashnum,
  } = req.body;
  console.log(req.body);
  let a = cart.getCart();

  let order_no = await DB_order.maxOrder();
  console.log(order_no.rows[0].M);
  order_id = order_no.rows[0].M + 1;
  username = req.session.userid;
  

  let food_id = a.prod[0].FOOD_ID;

  let customer = await DB_auth.getUserByUsername(username);
  let food = await DB_menu.getFoodByID(food_id);
  
let aq = "Your order has been accepted";

await DB_table.insertMessage(customer[0].ID, 1, aq, order_id, restname);

  await DB_order.confirmOrder(
    order_id,
    food.RESTAURANT_ID,
    customer[0].ID,
    a.totalPrice
  );

  for (const x of a.prod) {
    food_id = x.FOOD_ID;
    cnt = x.qty;
    //console.log("sss");
   // console.log(x);
    p=x.PRICE;
    await DB_order.InsertInOrder(food_id, order_id, cnt,p);
  }
  if (payment === "creditcard") {
    await DB_order.confirmCredit(
      order_id,
      customer[0].ID,
      cardname,
      bank,
      cardtype,
      cardnumber
    );
  } else if (payment === "bkash") {
    transaction_id = "2345672";

    await DB_order.confirmBkash(
      order_id,
      customer[0].ID,
      transaction_id,
      bkashnum
    );
  }

  rating.create(a.prod);
  cart.clear_cart();
  console.log("errtrtrtrttrtr");
  res.redirect("/rate/" + restname);
});

module.exports = router;
