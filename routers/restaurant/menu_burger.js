const express = require("express");
const bcrypt = require("bcrypt");
const DB_auth = require("../../DB_codes/DB_auth");
const DB_menu = require("../../DB_codes/DB_menu");
const DB_order = require("../../DB_codes/DB_order");
const router = express.Router({ mergeParams: true });
const cart = require("../../model/cart");
router.get("/burger", async (req, res) => {
  let burger = [];
  let special = [];
  burgtable = [];
  burger = await DB_menu.getOfferinMenu(1, 0);
  let reviews = await DB_order.getreview(1);
  for (let i = 0; i < burger.length; i++) {
    let x = 0;
    let n = 0;
    let p = 0;
    if (burger[i].RATING != null) {
      x = burger[i].RATING.toFixed(1);
    } else {
      x = 0;
    }

    if (burger[i].OFFER_PERCENT != null) {
      n = burger[i].PRICE - burger[i].PRICE * (burger[i].OFFER_PERCENT / 100);
      p = burger[i].PRICE;
    } else {
      n = burger[i].PRICE;
      p = 0;
    }
    burgtable.push({
      FOOD_ID: burger[i].FOOD_ID,
      RESTAURANT_ID: burger[i].RESTAURANT_ID,
      FOOD_NAME: burger[i].FOOD_NAME,
      CATEGORY: burger[i].CATEGORY,
      PREVPRICE: p,
      DESCRIPTION: burger[i].DESCRIPTION,
      QUANTITY: burger[i].QUANTITY,
      PIC_ID: burger[i].PIC_ID,
      STOCK: burger[i].STOCK,
      RATING: x,
      NEWPRICE: n,
    });
  }

  spectable = [];
  special = await DB_menu.getOfferinMenu(1, 1);

  for (let i = 0; i < special.length; i++) {
    let x = 0;
    let n = 0;
    let p = 0;
    if (special[i].RATING != null) {
      x = special[i].RATING.toFixed(1);
    } else {
      x = 0;
    }

    if (special[i].OFFER_PERCENT != null) {
      n =
        special[i].PRICE - special[i].PRICE * (special[i].OFFER_PERCENT / 100);
      p = special[i].PRICE;
    } else {
      n = special[i].PRICE;
      p = 0;
    }
    spectable.push({
      FOOD_ID: special[i].FOOD_ID,
      RESTAURANT_ID: special[i].RESTAURANT_ID,
      FOOD_NAME: special[i].FOOD_NAME,
      CATEGORY: special[i].CATEGORY,
      PREVPRICE: p,
      DESCRIPTION: special[i].DESCRIPTION,
      QUANTITY: special[i].QUANTITY,
      PIC_ID: special[i].PIC_ID,
      STOCK: special[i].STOCK,
      RATING: x,
      NEWPRICE: n,
    });
  }
  console.log(spectable);
  console.log("aaaaa");

  poptable = [];
  pop = await DB_menu.getPopular(1);

  for (let i = 0; i < pop.length; i++) {
    let x = 0;
    let n = 0;
    let p = 0;
    if (pop[i].RATING != null) {
      x = pop[i].RATING.toFixed(1);
    } else {
      x = 0;
    }

    if (pop[i].OFFER_PERCENT != null) {
      n = pop[i].PRICE - pop[i].PRICE * (pop[i].OFFER_PERCENT / 100);
      p = pop[i].PRICE;
    } else {
      n = pop[i].PRICE;
      p = 0;
    }
    poptable.push({
      FOOD_ID: pop[i].FOOD_ID,
      RESTAURANT_ID: pop[i].RESTAURANT_ID,
      FOOD_NAME: pop[i].FOOD_NAME,
      CATEGORY: pop[i].CATEGORY,
      PREVPRICE: p,
      DESCRIPTION: pop[i].DESCRIPTION,
      QUANTITY: pop[i].QUANTITY,
      PIC_ID: pop[i].PIC_ID,
      STOCK: pop[i].STOCK,
      RATING: x,
      NEWPRICE: n,
    });
  }

  offertable = [];
  offers = await DB_menu.getOffers(1);
  for (let i = 0; i < offers.length; i++) {
    let x = 0;
    let n = 0;
    let p = 0;
    if (offers[i].RATING != null) {
      x = offers[i].RATING.toFixed(1);
    } else {
      x = 0;
    }

    n = offers[i].PRICE - offers[i].PRICE * (offers[i].OFFER_PERCENT / 100);
    offertable.push({
      FOOD_ID: offers[i].FOOD_ID,
      RESTAURANT_ID: offers[i].RESTAURANT_ID,
      FOOD_NAME: offers[i].FOOD_NAME,
      CATEGORY: offers[i].CATEGORY,
      PREVPRICE: offers[i].PRICE,
      DESCRIPTION: offers[i].DESCRIPTION,
      QUANTITY: offers[i].QUANTITY,
      PIC_ID: offers[i].PIC_ID,
      STOCK: offers[i].STOCK,
      RATING: x,
      NEWPRICE: n,
      DATE_ACTIVE_FROM: offers[i].DATE_ACTIVE_FROM,
      DATE_ACTIVE_TO: offers[i].DATE_ACTIVE_TO,
    });
  }
  //console.log(offertable);
  const data = {
    isAuth: req.session.isAuth,
    username: req.session.userid,
    name: "burger",
    pop: poptable,
    burger: burgtable,
    special: spectable,
    offer: offertable,
    reviews,
  };
  //  if (cart.totalPrice != 0) cart.clear_cart();
  res.render("menu_burger2", data);
});

router.get("/candle_cafe", async (req, res) => {
  let burger = [];
  let special = [];
  burgtable = [];
  burger = await DB_menu.getOfferinMenu(2, 0);

  for (let i = 0; i < burger.length; i++) {
    let x = 0;
    let n = 0;
    let p = 0;
    if (burger[i].RATING != null) {
      x = burger[i].RATING.toFixed(1);
    } else {
      x = 0;
    }

    if (burger[i].OFFER_PERCENT != null) {
      n = burger[i].PRICE - burger[i].PRICE * (burger[i].OFFER_PERCENT / 100);
      p = burger[i].PRICE;
    } else {
      n = burger[i].PRICE;
      p = 0;
    }
    burgtable.push({
      FOOD_ID: burger[i].FOOD_ID,
      RESTAURANT_ID: burger[i].RESTAURANT_ID,
      FOOD_NAME: burger[i].FOOD_NAME,
      CATEGORY: burger[i].CATEGORY,
      PREVPRICE: p,
      DESCRIPTION: burger[i].DESCRIPTION,
      QUANTITY: burger[i].QUANTITY,
      PIC_ID: burger[i].PIC_ID,
      STOCK: burger[i].STOCK,
      RATING: x,
      NEWPRICE: n,
    });
  }

  spectable = [];
  special = await DB_menu.getOfferinMenu(2, 1);

  for (let i = 0; i < special.length; i++) {
    let x = 0;
    let n = 0;
    let p = 0;
    if (special[i].RATING != null) {
      x = special[i].RATING.toFixed(1);
    } else {
      x = 0;
    }

    if (special[i].OFFER_PERCENT != null) {
      n =
        special[i].PRICE - special[i].PRICE * (special[i].OFFER_PERCENT / 100);
      p = special[i].PRICE;
    } else {
      n = special[i].PRICE;
      p = 0;
    }
    spectable.push({
      FOOD_ID: special[i].FOOD_ID,
      RESTAURANT_ID: special[i].RESTAURANT_ID,
      FOOD_NAME: special[i].FOOD_NAME,
      CATEGORY: special[i].CATEGORY,
      PREVPRICE: p,
      DESCRIPTION: special[i].DESCRIPTION,
      QUANTITY: special[i].QUANTITY,
      PIC_ID: special[i].PIC_ID,
      STOCK: special[i].STOCK,
      RATING: x,
      NEWPRICE: n,
    });
  }
  console.log(spectable);
  console.log("aaaaa");
  poptable = [];
  pop = await DB_menu.getPopular(2);

  for (let i = 0; i < pop.length; i++) {
    let x = 0;
    let n = 0;
    let p = 0;
    if (pop[i].RATING != null) {
      x = pop[i].RATING.toFixed(1);
    } else {
      x = 0;
    }

    if (pop[i].OFFER_PERCENT != null) {
      n = pop[i].PRICE - pop[i].PRICE * (pop[i].OFFER_PERCENT / 100);
      p = pop[i].PRICE;
    } else {
      n = pop[i].PRICE;
      p = 0;
    }
    poptable.push({
      FOOD_ID: pop[i].FOOD_ID,
      RESTAURANT_ID: pop[i].RESTAURANT_ID,
      FOOD_NAME: pop[i].FOOD_NAME,
      CATEGORY: pop[i].CATEGORY,
      PREVPRICE: p,
      DESCRIPTION: pop[i].DESCRIPTION,
      QUANTITY: pop[i].QUANTITY,
      PIC_ID: pop[i].PIC_ID,
      STOCK: pop[i].STOCK,
      RATING: x,
      NEWPRICE: n,
    });
  }

  offertable = [];
  offers = await DB_menu.getOffers(2);
  for (let i = 0; i < offers.length; i++) {
    let x = 0;
    let n = 0;
    let p = 0;
    if (offers[i].RATING != null) {
      x = offers[i].RATING.toFixed(1);
    } else {
      x = 0;
    }

    n = offers[i].PRICE - offers[i].PRICE * (offers[i].OFFER_PERCENT / 100);
    offertable.push({
      FOOD_ID: offers[i].FOOD_ID,
      RESTAURANT_ID: offers[i].RESTAURANT_ID,
      FOOD_NAME: offers[i].FOOD_NAME,
      CATEGORY: offers[i].CATEGORY,
      PREVPRICE: offers[i].PRICE,
      DESCRIPTION: offers[i].DESCRIPTION,
      QUANTITY: offers[i].QUANTITY,
      PIC_ID: offers[i].PIC_ID,
      STOCK: offers[i].STOCK,
      RATING: x,
      NEWPRICE: n,
      DATE_ACTIVE_FROM: offers[i].DATE_ACTIVE_FROM,
      DATE_ACTIVE_TO: offers[i].DATE_ACTIVE_TO,
    });
  }

  let name = "candle_cafe";
  let reviews = await DB_order.getreview(2);

  const data = {
    isAuth: req.session.isAuth,
    username: req.session.userid,
    name,

    pop: poptable,
    burger: burgtable,
    special: spectable,
    offer: offertable,
    reviews,
  };
  //  if (cart.totalPrice != 0) cart.clear_cart();
  res.render("menu_burger2", data);
});

router.get("/Chinese_Mystic", async (req, res) => {
  let burger = [];
  let special = [];
  burgtable = [];

  burger = await DB_menu.getOfferinMenu(3, 0);

  for (let i = 0; i < burger.length; i++) {
    let x = 0;
    let n = 0;
    let p = 0;
    if (burger[i].RATING != null) {
      x = burger[i].RATING.toFixed(1);
    } else {
      x = 0;
    }

    if (burger[i].OFFER_PERCENT != null) {
      n = burger[i].PRICE - burger[i].PRICE * (burger[i].OFFER_PERCENT / 100);
      p = burger[i].PRICE;
    } else {
      n = burger[i].PRICE;
      p = 0;
    }
    burgtable.push({
      FOOD_ID: burger[i].FOOD_ID,
      RESTAURANT_ID: burger[i].RESTAURANT_ID,
      FOOD_NAME: burger[i].FOOD_NAME,
      CATEGORY: burger[i].CATEGORY,
      PREVPRICE: p,
      DESCRIPTION: burger[i].DESCRIPTION,
      QUANTITY: burger[i].QUANTITY,
      PIC_ID: burger[i].PIC_ID,
      STOCK: burger[i].STOCK,
      RATING: x,
      NEWPRICE: n,
    });
  }

  spectable = [];
  special = await DB_menu.getOfferinMenu(3, 1);

  for (let i = 0; i < special.length; i++) {
    let x = 0;
    let n = 0;
    let p = 0;
    if (special[i].RATING != null) {
      x = special[i].RATING.toFixed(1);
    } else {
      x = 0;
    }

    if (special[i].OFFER_PERCENT != null) {
      n =
        special[i].PRICE - special[i].PRICE * (special[i].OFFER_PERCENT / 100);
      p = special[i].PRICE;
    } else {
      n = special[i].PRICE;
      p = 0;
    }
    spectable.push({
      FOOD_ID: special[i].FOOD_ID,
      RESTAURANT_ID: special[i].RESTAURANT_ID,
      FOOD_NAME: special[i].FOOD_NAME,
      CATEGORY: special[i].CATEGORY,
      PREVPRICE: p,
      DESCRIPTION: special[i].DESCRIPTION,
      QUANTITY: special[i].QUANTITY,
      PIC_ID: special[i].PIC_ID,
      STOCK: special[i].STOCK,
      RATING: x,
      NEWPRICE: n,
    });
  }
  console.log(spectable);
  console.log("aaaaa");
  poptable = [];
  pop = await DB_menu.getPopular(3);

  for (let i = 0; i < pop.length; i++) {
    let x = 0;
    let n = 0;
    let p = 0;
    if (pop[i].RATING != null) {
      x = pop[i].RATING.toFixed(1);
    } else {
      x = 0;
    }

    if (pop[i].OFFER_PERCENT != null) {
      n = pop[i].PRICE - pop[i].PRICE * (pop[i].OFFER_PERCENT / 100);
      p = pop[i].PRICE;
    } else {
      n = pop[i].PRICE;
      p = 0;
    }
    poptable.push({
      FOOD_ID: pop[i].FOOD_ID,
      RESTAURANT_ID: pop[i].RESTAURANT_ID,
      FOOD_NAME: pop[i].FOOD_NAME,
      CATEGORY: pop[i].CATEGORY,
      PREVPRICE: p,
      DESCRIPTION: pop[i].DESCRIPTION,
      QUANTITY: pop[i].QUANTITY,
      PIC_ID: pop[i].PIC_ID,
      STOCK: pop[i].STOCK,
      RATING: x,
      NEWPRICE: n,
    });
  }

  offertable = [];
  offers = await DB_menu.getOffers(3);
  for (let i = 0; i < offers.length; i++) {
    let x = 0;
    let n = 0;
    let p = 0;
    if (offers[i].RATING != null) {
      x = offers[i].RATING.toFixed(1);
    } else {
      x = 0;
    }

    n = offers[i].PRICE - offers[i].PRICE * (offers[i].OFFER_PERCENT / 100);
    offertable.push({
      FOOD_ID: offers[i].FOOD_ID,
      RESTAURANT_ID: offers[i].RESTAURANT_ID,
      FOOD_NAME: offers[i].FOOD_NAME,
      CATEGORY: offers[i].CATEGORY,
      PREVPRICE: offers[i].PRICE,
      DESCRIPTION: offers[i].DESCRIPTION,
      QUANTITY: offers[i].QUANTITY,
      PIC_ID: offers[i].PIC_ID,
      STOCK: offers[i].STOCK,
      RATING: x,
      NEWPRICE: n,
      DATE_ACTIVE_FROM: offers[i].DATE_ACTIVE_FROM,
      DATE_ACTIVE_TO: offers[i].DATE_ACTIVE_TO,
    });
  }
  let reviews = await DB_order.getreview(3);
  let name = "Chinese_Mystic";
  console.log(poptable);

  const data = {
    isAuth: req.session.isAuth,
    username: req.session.userid,
    name,

    pop: poptable,
    burger: burgtable,
    special: spectable,
    offer: offertable,
    reviews,
  };
  // if (cart.totalPrice != 0) cart.clear_cart();
  res.render("menu_burger2", data);
});

router.get("/Steak_N_Dine", async (req, res) => {
  let burger = [];
  let special = [];
  burgtable = [];
  burger = await DB_menu.getOfferinMenu(4, 0);

  for (let i = 0; i < burger.length; i++) {
    let x = 0;
    let n = 0;
    let p = 0;
    if (burger[i].RATING != null) {
      x = burger[i].RATING.toFixed(1);
    } else {
      x = 0;
    }

    if (burger[i].OFFER_PERCENT != null) {
      n = burger[i].PRICE - burger[i].PRICE * (burger[i].OFFER_PERCENT / 100);
      p = burger[i].PRICE;
    } else {
      n = burger[i].PRICE;
      p = 0;
    }
    burgtable.push({
      FOOD_ID: burger[i].FOOD_ID,
      RESTAURANT_ID: burger[i].RESTAURANT_ID,
      FOOD_NAME: burger[i].FOOD_NAME,
      CATEGORY: burger[i].CATEGORY,
      PREVPRICE: p,
      DESCRIPTION: burger[i].DESCRIPTION,
      QUANTITY: burger[i].QUANTITY,
      PIC_ID: burger[i].PIC_ID,
      STOCK: burger[i].STOCK,
      RATING: x,
      NEWPRICE: n,
    });
  }

  spectable = [];
  special = await DB_menu.getOfferinMenu(4, 1);

  for (let i = 0; i < special.length; i++) {
    let x = 0;
    let n = 0;
    let p = 0;
    if (special[i].RATING != null) {
      x = special[i].RATING.toFixed(1);
    } else {
      x = 0;
    }

    if (special[i].OFFER_PERCENT != null) {
      n =
        special[i].PRICE - special[i].PRICE * (special[i].OFFER_PERCENT / 100);
      p = special[i].PRICE;
    } else {
      n = special[i].PRICE;
      p = 0;
    }
    spectable.push({
      FOOD_ID: special[i].FOOD_ID,
      RESTAURANT_ID: special[i].RESTAURANT_ID,
      FOOD_NAME: special[i].FOOD_NAME,
      CATEGORY: special[i].CATEGORY,
      PREVPRICE: p,
      DESCRIPTION: special[i].DESCRIPTION,
      QUANTITY: special[i].QUANTITY,
      PIC_ID: special[i].PIC_ID,
      STOCK: special[i].STOCK,
      RATING: x,
      NEWPRICE: n,
    });
  }
  console.log(spectable);
  console.log("aaaaa");
  poptable = [];
  pop = await DB_menu.getPopular(4);

  for (let i = 0; i < pop.length; i++) {
    let x = 0;
    let n = 0;
    let p = 0;
    if (pop[i].RATING != null) {
      x = pop[i].RATING.toFixed(1);
    } else {
      x = 0;
    }

    if (pop[i].OFFER_PERCENT != null) {
      n = pop[i].PRICE - pop[i].PRICE * (pop[i].OFFER_PERCENT / 100);
      p = pop[i].PRICE;
    } else {
      n = pop[i].PRICE;
      p = 0;
    }
    poptable.push({
      FOOD_ID: pop[i].FOOD_ID,
      RESTAURANT_ID: pop[i].RESTAURANT_ID,
      FOOD_NAME: pop[i].FOOD_NAME,
      CATEGORY: pop[i].CATEGORY,
      PREVPRICE: p,
      DESCRIPTION: pop[i].DESCRIPTION,
      QUANTITY: pop[i].QUANTITY,
      PIC_ID: pop[i].PIC_ID,
      STOCK: pop[i].STOCK,
      RATING: x,
      NEWPRICE: n,
    });
  }

  offertable = [];
  offers = await DB_menu.getOffers(4);
  for (let i = 0; i < offers.length; i++) {
    let x = 0;
    let n = 0;
    let p = 0;
    if (offers[i].RATING != null) {
      x = offers[i].RATING.toFixed(1);
    } else {
      x = 0;
    }

    n = offers[i].PRICE - offers[i].PRICE * (offers[i].OFFER_PERCENT / 100);
    offertable.push({
      FOOD_ID: offers[i].FOOD_ID,
      RESTAURANT_ID: offers[i].RESTAURANT_ID,
      FOOD_NAME: offers[i].FOOD_NAME,
      CATEGORY: offers[i].CATEGORY,
      PREVPRICE: offers[i].PRICE,
      DESCRIPTION: offers[i].DESCRIPTION,
      QUANTITY: offers[i].QUANTITY,
      PIC_ID: offers[i].PIC_ID,
      STOCK: offers[i].STOCK,
      RATING: x,
      NEWPRICE: n,
      DATE_ACTIVE_FROM: offers[i].DATE_ACTIVE_FROM,
      DATE_ACTIVE_TO: offers[i].DATE_ACTIVE_TO,
    });
  }
  let reviews = await DB_order.getreview(4);
  let name = "Steak_N_Dine";

  const data = {
    isAuth: req.session.isAuth,
    username: req.session.userid,
    name,

    pop: poptable,
    burger: burgtable,
    special: spectable,
    offer: offertable,
    reviews,
  };
  // if (cart.totalPrice != 0) cart.clear_cart();
  res.render("menu_burger2", data);
});

module.exports = router;
