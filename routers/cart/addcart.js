const express = require("express");
const bcrypt = require("bcrypt");
const DB_auth = require("../../DB_codes/DB_auth");
const DB_menu = require("../../DB_codes/DB_menu");
const router = express.Router({ mergeParams: true });
const cart = require("../../model/cart");
router.post("/", async (req, res) => {
 

const { food_id,username,price } = req.body;

let food = await DB_menu.getFoodByID(food_id);
food.PRICE=price*1;

 cart.save(food,username);

let a = cart.getCart();

});
router.post("/ordernow", async (req, res) => {
  const { food_id, username, price,name } = req.body;

  let food = await DB_menu.getFoodByID(food_id);
  food.PRICE = price * 1;

  cart.save(food, username);

  let a = cart.getCart();

res.redirect("/checkout/" + name);

});


router.get("/show_cart/:name", async (req, res) => {
 let aa = cart.getCart();
 if (aa== null) {
   console.log("GGG", req.params.name);
   res.redirect("/menu_burger/"+req.params.name);
 } 
 else {
   let a = cart.getCart();

   const data = {
     isAuth: req.session.isAuth,
     username: req.session.userid,
     foods: a.prod,
     total: a.totalPrice,
     name: req.params.name,
   };
   res.render("cart", data);
 }

    });
 






router.get("/delete/:food_id/:name", async (req, res) => {
  const food_id = req.params.food_id;
  const name = req.params.name;

  
  cart.delete(food_id);

  res.redirect("/add_cart/show_cart/"+name);
});





router.get("/increase/:food_id/:name", async (req, res) => {
   const food_id = req.params.food_id;
   const name = req.params.name;

let food = await DB_menu.getFoodByID(food_id);
let username= req.session.userid;
cart.increase(food, username);


  res.redirect("/add_cart/show_cart/"+name);
});



router.get("/decrease/:food_id/:name", async (req, res) => {
  const food_id = req.params.food_id;
  const name=req.params.name;
 
let food = await DB_menu.getFoodByID(food_id);
  cart.decrease(food);
  let a = cart.getCart();
 
  res.redirect("/add_cart/show_cart/"+name);
});











module.exports = router;
