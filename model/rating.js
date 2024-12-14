let rating = null;

module.exports = class Rating {
  static create(prod) {
    if (rating === null) {
      rating = {};
    }

    for (let x in prod) {
      rating[prod[x].FOOD_ID] = 0;
    }
  }

  static getRating() {
    return rating;
  }

  static increase(pid) {
    rating[pid] = Math.min(rating[pid] + 1, 5);
  }

  static decrease(pid) {
    rating[pid] = Math.max(rating[pid] - 1, 0);
  }

  static clear() {
    rating = {};
  }
static saverating()
{for (const it in rating) {


//  await DB_order.updatefoodrating(it, rating[it]);
          
     clear();

}
}

};
/*
 static create(prod) {
    if (rating === null) {
      rating= {};
    }
   
    for (let x in prod) {
       
      rating[prod[x].FOOD_ID] = 0;
    }
  }
*/
