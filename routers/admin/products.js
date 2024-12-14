const express = require("express");
const bcrypt = require("bcrypt");
const DB_auth = require("../../DB_codes/DB_auth");
const DB_menu = require("../../DB_codes/DB_menu");
const router = express.Router({ mergeParams: true });
const cart = require("../../model/cart");

router.get("/addproducts", async (req, res) => {
  res.render("admin_main_add_products");
});

router.post("/add_products", async (req, res) => {
  const { name, description, category, price, quantity, rest, type } = req.body;
  console.log(req.body);
  let n;
  let t;
  if (rest == "Burgerology") {
    n = 1;
  } else if (rest == "Candle café") {
    n = 2;
  } else if (rest == "Steak_N_Dine") {
    n = 4;
  } else if (rest == "Koreana Pleasure") {
    n = 5;
  } else if (rest == "Biriyani Pleasure") {
    n = 6;
  } else if (rest == "Chinese Mystic") {
    n = 3;
  }

  if (type == "special") {
    t = 1;
  } else if (type == "regular") {
    t = 0;
  }

  let no = await DB_menu.getmaxfoodid();
  foodid = no.rows[0].M + 1;

  await DB_menu.addProduct(
    foodid * 1,
    n,
    name,
    category,
    price * 1,
    description,
    quantity * 1,
    t
  );

  res.render("admin_main_add_products");
});

router.post("/updateproduct", async (req, res) => {
  const { food_id, name } = req.body;

  console.log(req.body);

  let food = await DB_menu.getFoodByID(food_id);
  console.log(food);
  const data = {
    isAuth: req.session.isAuth,
    username: req.session.userid,
    name: name,

    food,
  };

  res.render("admin_menu_update", data);
});

router.post("/deleteproduct", async (req, res) => {
  const { food_id, name } = req.body;

  console.log(req.body);
  console.log("deleted");

   await DB_menu.DeleteFoodByID(food_id);


  res.redirect("/restaurant/" + name);
});

router.post("/update_products", async (req, res) => {
  const {
    foodid,
    name,
    foodname,
    description,
    category,
    price,
    quantity,
    type,
  } = req.body;

  console.log(req.body);

  let food = await DB_menu.getFoodByID(foodid);
let t;
  console.log(food);
  if(type=='regular')
  {
    t=0;
  }
  if(type=='special')
  {t=1;}

   await DB_menu.UpdateProduct(
     foodid*1,
     foodname,
     description,
     category,
     price*1,
     quantity*1,
     0,
     t
   );
  

  res.redirect("/restaurant/" + name);
});


router.post("/createoffer", async (req, res) => {
  const { food_id, name } = req.body;
console.log(req.body);

let food = await DB_menu.getFoodByID(food_id);
console.log(food);
const data = {
  isAuth: req.session.isAuth,
  username: req.session.userid,
  name: name,

  food,
};


res.render("admin_offer_food", data);
});


router.post("/create_offer", async (req, res) => {
  const { foodid, name,foodname,price,offer,fromd,tod } = req.body;
  console.log("offeroffer");
  console.log(req.body);
  
  console.log(fromd);
  console.log(tod);
  let no = await DB_menu.getmaxofferid();
  offerid = no.rows[0].M + 1;

 

await DB_menu.createOffer(offerid*1,foodid*1,offer*1,fromd,tod);



  res.redirect("/restaurant/" + name);
});


router.get("/show_offer", async (req, res) => {
  //const { foodid, name, foodname, price, offer, fromd, tod } = req.body;
 
let menu1=await DB_menu.FindOffer(1);
let menu2=await DB_menu.FindOffer(2);
let menu3=await DB_menu.FindOffer(3);
let menu4 = await DB_menu.FindOffer(4);
console.log()
console.log(menu1);
const data = {
  isAuth: req.session.isAuth,
  username: req.session.userid,
  menu1,
  menu2,
  menu3,
  menu4,

  
};


res.render("current_offer", data);
});


router.get("/deleteoffer/:id", async (req, res) => {
  //const { foodid, name, foodname, price, offer, fromd, tod } = req.body;
id=req.params.id;
await DB_menu.DeleteOffer(id*1);
  let menu1 = await DB_menu.FindOffer(1);
  let menu2 = await DB_menu.FindOffer(2);
  let menu3 = await DB_menu.FindOffer(3);
  let menu4 = await DB_menu.FindOffer(4);
  
  console.log(menu1);
  const data = {
    isAuth: req.session.isAuth,
    username: req.session.userid,
    menu1,
    menu2,
    menu3,
    menu4,
  };

  res.render("current_offer", data);
});








module.exports = router;
