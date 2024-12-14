const express = require("express");
const bcrypt = require("bcrypt");
const DB_auth = require("../../DB_codes/DB_auth");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  if (req.session.isAuth) {
    res.render("home");
  } else res.render("register", { message: "Enter Credentials" });
});
router.post("/", async (req, res) => {
  const { name, username, email, address, password, position } = req.body;

  if (position === "admin") {
    let userExists =
      (await DB_auth.getUserByAdminUsername(username)).length == 0
        ? false
        : true;

    if (userExists) {
      return res.render("register", { message: "User already exists" });
    }

    if (!username || !email || !password) {
      return res.render("register", { message: "Please provide all info" });
    }

    //if new user
    const hashpassword = await bcrypt.hash(password, 4);
    //insert user into db with hashed password
    await DB_auth.insertAdminIntoDB(
      name,
      username,
      hashpassword,
      email,
      address
    );
    res.redirect("/");
  } else if (position === "customer") {
    let userExists =
      (await DB_auth.getUserByUsername(username)).length == 0 ? false : true;

    if (userExists) {
      return res.render("register", { message: "User already exists" });
    }

    if (!username || !email || !password) {
      return res.render("register", { message: "Please provide all info" });
    }

    //if new user
    const hashpassword = await bcrypt.hash(password, 4);
    //insert user into db with hashed password

    await DB_auth.insertAccountIntoDB(
      name,
      username,
      hashpassword,
      email,
      address
    );
    res.redirect("/");
  }
});

module.exports = router;
