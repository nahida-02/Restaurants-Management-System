const express = require("express");
const router = express.Router({ mergeParams: true });

const cart = require("../model/cart");
const loginRouter = require("./authentication/login");
const registerRouter = require("./authentication/register");
const logoutRouter = require("./authentication/logout");
const menuRouter = require("./restaurant/menu_burger");
const contactRouter = require("./user/contact");
const cartRouter = require("./cart/addcart");
const checkoutRouter = require("./cart/checkout");
const rateRouter = require("./cart/rate");
const adminRouter = require("./admin/restaurants");
const restRouter = require("./restaurant/showdetail");
const tableRouter = require("./tablle/tablebooking");
const profRouter = require("./profile/customer");
const showorderRouter = require("./restaurant/showorder");
const prodRouter = require("./admin/products");
const reviewRouter=require("./cart/review");
const transRouter = require("./admin/transaction");

router.use("/login", loginRouter);
//router.use("/logout", logoutRouter);
router.use("/register", registerRouter);
router.use("/menu_burger",menuRouter);
router.use("/contact",contactRouter);
router.use("/add_cart", cartRouter);
router.use("/checkout",checkoutRouter);
router.use("/admin", adminRouter);
router.use("/rate", rateRouter);
router.use("/restaurant", restRouter);
router.use("/table",tableRouter);
router.use("/profile", profRouter);
router.use("/showorder", showorderRouter);
router.use("/products", prodRouter);
router.use("/review",reviewRouter);
router.use("/trans", transRouter);



//main page
router.get("/", async (req, res) => {
  const username = req.session.userid;
   req.session.destroy();
  { res.render("index");}
});


router.get("/showhome", async (req, res) => {
  const username = req.session.userid;
  let a = cart.getCart();
  if (a == null || a.totalPrice == 0) {
  } else {
    cart.clear_cart();
  }
  
  {
    res.render("home");
  }
});


router.get("/logout", (req, res) => {
  let a=cart.getCart()
  if (a == null || a.totalPrice == 0) {
   
  } else {
    cart.clear_cart();
  }
  req.session.destroy();
  res.render("index");
});
router.get("/adminlogout", (req, res) => {
  
  req.session.destroy();
  res.render("index");
});


module.exports=router;