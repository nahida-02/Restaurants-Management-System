const express = require("express");
const bcrypt = require("bcrypt");
const DB_auth = require("../../DB_codes/DB_auth");
const DB_menu = require("../../DB_codes/DB_menu");
const DB_customer = require("../../DB_codes/DB_customer");
const DB_order = require("../../DB_codes/DB_order");

const router = express.Router({ mergeParams: true });
const cart = require("../../model/cart");
const rating = require("../../model/rating");

router.get("/:name", async (req, res) => {
 
  let a = cart.getCart();
  let r = rating.getRating();
  
  item=[]
   //food1 = DB_menu.getFoodByID(1);
 //  console.log(food1);
for (const it in r) {
  food = await DB_menu.getFoodByID(it);
  console.log(food);
  food_name=food.FOOD_NAME;
  item.push(
    {
      'foodid':it,
      'rating':r[it],
      'foodname':food_name

    }
  )

  
 
}



  const data = {
    isAuth: req.session.isAuth,
    username: req.session.userid,
    foods: a.prod,
    total: a.totalPrice,
    item:item,
    name:req.params.name,
  };
  res.render("rating1", data);
});

router.get("/increase/:food_id/:name", async (req, res) => {
  const food_id = req.params.food_id;
    const name= req.params.name;

  let r = rating.getRating();
  let food = await DB_menu.getFoodByID(food_id);
  let username = req.session.userid;
  rating.increase(food_id);
  


  res.redirect("/rate/" + name);


});

router.get("/decrease/:food_id/:name", async (req, res) => {
 const food_id = req.params.food_id;
 const name=req.params.name;
 let r = rating.getRating();
 let food = await DB_menu.getFoodByID(food_id);
 let username = req.session.userid;
 rating.decrease(food_id);

 res.redirect("/rate/" + name);

});


router.get("/save/:name", async (req, res) => {
 
  const name=req.params.name;
let r = rating.getRating();
for (const it in r) {
  console.log(it);
  console.log(r[it]);
  await DB_order.updatefoodrating(it, r[it]);
}


 // let a = cart.getCart();
  let rr = rating.getRating();

  item = [];
  //food1 = DB_menu.getFoodByID(1);
  //  console.log(food1);
  for (const it in rr) {
    food = await DB_menu.getFoodByID(it);
   
    food_name = food.FOOD_NAME;
    item.push({
      foodid: it,
      foodname: food_name,
    });
  }

  rating.clear();
 // rating.saverating();


  //res.redirect("/menu_burger/"+name);
  
  const data = {
    isAuth: req.session.isAuth,
    username: req.session.userid,
    
    item: item,
    name: req.params.name,
  };
  res.render("customer_review", data);
});



module.exports = router;
