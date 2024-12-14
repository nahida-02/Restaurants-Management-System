const express = require("express");
const bcrypt = require("bcrypt");
const DB_auth = require("../../DB_codes/DB_auth");
const DB_menu = require("../../DB_codes/DB_menu");
const DB_table = require("../../DB_codes/DB_table");
const router = express.Router({ mergeParams: true });
const cart = require("../../model/cart");

router.post("/", async (req, res) => {
    let n;
    username= req.session.userid;
    let custome = await DB_auth.getUserByUsername(username);
    let customer = custome[0].ID;
  const { rest } = req.body;

  if(rest=='burger')
  {n=1;}
  if (rest == "candle_cafe") {
    n = 2;
  }
  if (rest == "Chinese_Mystic") {
    n = 3;
  }
  if (rest == "Steak_N_Dine") {
    n = 4;
  }
let orders = await DB_table.gettrans(customer,n);
console.log(orders);

final=[];

for (let i = 0; i < orders.length; i++){
let inor = await DB_table.getFOODS(orders[i].ORDER_ID);

cartt=[];
let total=0;
let tqt=0;
for (let i = 0; i < inor.length; i++){
    (total += inor[i].QUANTITY*inor[i].FINALPRICE),
      (tqt += inor[i].QUANTITY),
      console.log("Inor");
    console.log(inor[i]);
cartt.push({
  foodname: inor[i].FOOD_NAME,
  price: inor[i].FINALPRICE,
  quantity: inor[i].QUANTITY,
  fprice: inor[i].QUANTITY * inor[i].FINALPRICE,
});

 console.log(cartt);
}

final.push({

     cat:cartt,
     orderid:orders[i].ORDER_ID,
     date:orders[i].TIME_OF_ORDER,
     payment:orders[i].PAYMENT,
     total:total,
     tqt:tqt,

 });


 

}

console.log("SDASD");
console.log(final[0].cat)
;
console.log("asasadsassd");



  const data = {
    isAuth: req.session.isAuth,
    username: req.session.userid,
    final:final,
    
  };
  //  if (cart.totalPrice != 0) cart.clear_cart();
 res.render("order_info", data);
});

module.exports = router;
