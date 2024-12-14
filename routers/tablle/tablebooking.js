const express = require("express");
const bcrypt = require("bcrypt");
const DB_auth = require("../../DB_codes/DB_auth");
const DB_menu = require("../../DB_codes/DB_menu");
const DB_table = require("../../DB_codes/DB_table");
const router = express.Router({ mergeParams: true });
const cart = require("../../model/cart");

router.post("/", async (req, res) => {
const { date,hours,email,phone,rest,number } = req.body;
username= req.session.userid;
let custome = await DB_auth.getUserByUsername(username);
let customer=custome[0].ID;
console.log(req.body);
console.log(customer);
console.log(hours);let ress;
console.log(date);
console.log(number);
if(rest=='burger')
{ress='Burgerology';}
else
{ress=rest;}

let dates=date;
 await DB_table.insertTable(customer, dates, hours,ress, number);


});
router.get("/showtable", async (req, res) => {
  
let approve = await DB_table.getApproveTable();
let waiting = await DB_table.getWaitTable();
  const data = {
    isAuth: req.session.isAuth,
    username: req.session.userid,
    approve,
    waiting,

  };
  //  if (cart.totalPrice != 0) cart.clear_cart();
  res.render("tableshow", data);
 

});

router.get("/approved/:id", async (req, res) => {
    id=req.params.id;
    console.log(id,"     id");
    let info = await DB_table.getinfoWaitTable(id * 1); 
    console.log(info);
    let infor=info[0];
    console.log(infor);
let nnn;
    await DB_table.insertApproveTable(
      infor.CUSTOMER_ID,
      infor.BOOKDATE,
      infor.BOOKTIME,
      infor.PERSONS,
      infor.REST_NAME
    ); 
    if ((infor.REST_NAME == "Burgerology")) {
      nnn = "burger";
    } else {
      nnn = infor.REST_NAME;
    }
let a = "Your table booking has been accepted";
console.log("msg  del ", nnn, " ", infor.REST_NAME);

await DB_table.insertMessage(infor.CUSTOMER_ID, 0, a, id,nnn);

 await DB_table.Deletetable(id * 1);
  let approve = await DB_table.getApproveTable();
  let waiting = await DB_table.getWaitTable();
  const data = {
    isAuth: req.session.isAuth,
    username: req.session.userid,
    approve,
    waiting,
  };
  //  if (cart.totalPrice != 0) cart.clear_cart();
  res.render("tableshow", data);
});

router.get("/declined/:id", async (req, res) => {
  id = req.params.id; let nnn;
  console.log(id, "     id");
  let info = await DB_table.getinfoWaitTable(id * 1);
  let infor = info[0];
  console.log(infor);

 
   if ((infor.REST_NAME == "Burgerology")) {
    nnn = "burger";
  }
  else {nnn = infor.REST_NAME;}
await DB_table.Deletetable(id * 1);
  let a="Your table booking has been cancelled";
  console.log("msg  del ", nnn, " ", infor.REST_NAME);

await DB_table.insertMessage(infor.CUSTOMER_ID, 0, a, id,nnn);
  let approve = await DB_table.getApproveTable();
  let waiting = await DB_table.getWaitTable();
  const data = {
    isAuth: req.session.isAuth,
    username: req.session.userid,
    approve,
    waiting,
  };
  //  if (cart.totalPrice != 0) cart.clear_cart();
  res.render("tableshow", data);
});

router.get("/order_msg/:name", async (req, res) => {
  na=req.params.name;
   username=req.session.userid;
let custome = await DB_auth.getUserByUsername(username);
let customer = custome[0].ID;
console.log("seeeee    "+na+"     ",customer);
let msg = await DB_table.getMessage(customer,na);
 

  const data = {
    isAuth: req.session.isAuth,
    username: req.session.userid,
   msg,
  };
  //  if (cart.totalPrice != 0) cart.clear_cart();
  res.render("table_booking_msg", data);
});




// router.get("/booking_msg", async (req, res) => {
//   username = req.session.userid;
//   let custome = await DB_auth.getUserByUsername(username);
//   let customer = custome[0].ID;
//   let msg = await DB_table.getMessage(customer,0);
//   const data = {
//     isAuth: req.session.isAuth,
//     username: req.session.userid,
//    msg,
//   };
//   //  if (cart.totalPrice != 0) cart.clear_cart();
//   res.render("table_booking_msg", data);
// });

module.exports = router;
