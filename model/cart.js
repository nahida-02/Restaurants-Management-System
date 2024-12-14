let cart = null;

module.exports = class Cart {
  static save(prod, user) {
    if (cart === null) {
      cart = { prod: [], totalPrice: 0, username: user };
    }

    const existingProductIndex = cart.prod.findIndex(
      (p) => p.FOOD_ID == prod.FOOD_ID
    ); // to check product is existing in cart

    if (existingProductIndex >= 0) {
      // exist in cart already
      const exsitingProduct = cart.prod[existingProductIndex];
      exsitingProduct.qty += 1;
      exsitingProduct.pay += prod.PRICE;
    } else {
      //not exist
      prod.qty = 1;
      prod.pay = prod.PRICE;
      cart.prod.push(prod);
    }

    cart.totalPrice += prod.PRICE;
    cart.username = user;
  }
  static clear_cart() {
    
    cart.prod = [];
    cart.totalPrice = 0;
  }

  
  static getCart() {
    return cart;
  }

  static increase(prod, user) {
    if (cart === null) {
      cart = { prod: [], totalPrice: 0, username: user };
    }

    const existingProductIndex = cart.prod.findIndex(
      (p) => p.FOOD_ID == prod.FOOD_ID
    ); // to check product is existing in cart

    if (existingProductIndex >= 0) {
      // exist in cart already
      const exsitingProduct = cart.prod[existingProductIndex];
      exsitingProduct.qty += 1;
      exsitingProduct.pay += prod.PRICE;
    } else {
      //not exist
      prod.qty = 1;
      prod.pay = prod.PRICE;
      cart.prod.push(prod);
    }

    cart.totalPrice += prod.PRICE;
    cart.username = user;
  }

  static decrease(prod) {
    const isExisting = cart.prod.findIndex((p) => p.FOOD_ID == prod.FOOD_ID);
    if (isExisting >= 0) {
      const exsitingProduct = cart.prod[isExisting];
      if (exsitingProduct.qty > 0) {
        exsitingProduct.qty -= 1;
        exsitingProduct.pay -= prod.PRICE;
        cart.totalPrice -= prod.PRICE;
      }
    }
  }

  static delete(productId) {
    const isExisting = cart.prod.findIndex((p) => p.FOOD_ID == productId);
    if (isExisting >= 0) {
      const deletedProduct = cart.prod[isExisting];

      cart.totalPrice -= deletedProduct.PRICE * deletedProduct.qty;

      cart.prod.splice(isExisting, 1);
    }
  }
};
