const express = require("express");
const bcrypt = require("bcrypt");
const DB_auth = require("../../DB_codes/DB_auth");
const router = express.Router({ mergeParams: true });
const cart = require("../../model/cart");
router.get("/", async (req, res) => {
  if (req.session.isAuth) {
    res.render("home");
  }
  else
  res.render("login", { message: "Please provide info" });
});

router.post("/", async (req, res) => {
  const { username, password ,position} = req.body;
 
if(position==='customer'){
  const user = await DB_auth.getUserByUsername(username);
  const userExists = user.length == 0 ? false : true;
  if (!userExists) {
    return res.render("login", { message: "Error logging in" });
  }

  const passwordMatch = await bcrypt.compare(password, user[0].PASSWORD);
  if (!passwordMatch) {
    return res.render("login", { message: "Error logging in" });
  }
  req.session.userid = req.body.username;
  req.session.isAuth = true;
   res.render("home");

}

 else if (position === "admin") {
    console.log(position);
    const user = await DB_auth.getUserByAdminUsername(username);
    console.log(user);
    const userExists = user.length == 0 ? false : true;
    if (!userExists) {
      return res.render("login", { message: "Error logging in" });
    }
console.log(userExists);
    const passwordMatch = await bcrypt.compare(password, user[0].PASSWORD);
    if (!passwordMatch) {
      return res.render("login", { message: "Error logging in" });
    }
    req.session.userid = req.body.username;
    req.session.isAuth = true;


console.log("ssss");
     res.render("admin_main");
  }
 
});
module.exports = router;
