const database = require("./database");


async function maxOrder() {
  let sql = `
  SELECT MAX(ORDER_ID) AS M
        FROM PLACEDORDER 
        
    `;
  return await database.execute(
    sql,
    [],
    database.options
  );
}
async function confirmOrder(order_no,rest,customer_id, total) {
  let sql = `
  
        BEGIN
           CONFIRM_ORDER(:order_no,:rest,:customer_id,:total);
        END;
    `;
  return await database.execute(sql, [order_no,rest,customer_id,total], database.options);
}


async function InsertInOrder(food_id, order_id, qty,p) {
  let sql = `
  
        BEGIN
           INSERT_PRODUCTS_IN_ORDER(:food_id,:order_id,:qty,:p);
        END;
    `;
  return await database.execute(
    sql,
    [food_id,order_id,qty,p],
    database.options
  );
}


async function confirmCredit(order_id, cust_id, user,bank,ctype,cno) {
  let sql = `
  
        BEGIN
           CONFIRM_CREDIT_CARD(:order_id,:cust_id,:user,:bank,:ctype,:cno);
        END;
    `;
  return await database.execute(
    sql,
    [order_id, cust_id, user, bank, ctype, cno],
    database.options
  );
}


async function confirmBkash(order_id, cust_id,trans_id,phone) {
  let sql = `
  
        BEGIN
           CONFIRM_BKASH(:order_id,:cust_id,:trans_id,:phone);
        END;
    `;
  return await database.execute(
    sql,
    [order_id, cust_id, trans_id,phone],
    database.options
  );
}

async function updatefoodrating(fid,rate) {
  let sql = `
  
        BEGIN
           UPDATE_FOOD_RATING(:fid,:rate);
        END;
    `;
  return await database.execute(
    sql,
    [fid,rate],
    database.options
  );
}


async function insertreview(cid,fid,txt,X,Y ) {
  let sql = `
  
       INSERT INTO FOOD_REVIEW (CUSTOMER_ID,FOOD_ID,REVIEW_TEXT,REVIEW_TIME,FNAME,CNAME) VALUES (:cid,:fid,:txt,SYSDATE,:X,:Y)
    `;
  return await database.execute(sql, [cid, fid,txt,X,Y], database.options);
}




async function getreview(rest) {
  let sql = `
  
     SELECT * FROM FOOD_REVIEW
     WHERE FOOD_ID IN (SELECT FOOD_ID FROM MENU WHERE RESTAURANT_ID=:rest)
     ORDER BY FOOD_ID
    `;
  return (await database.execute(sql, [rest], database.options)).rows;
}







module.exports = {
  confirmOrder,
  maxOrder,
  InsertInOrder,
  confirmCredit,
  confirmBkash,
  updatefoodrating,
  insertreview,
  getreview,
};