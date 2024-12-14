const database = require("./database");

async function insertTable(id, datess, hourss, rest, num) {
  console.log(id, datess, hourss, num);
  let sql = `
        INSERT INTO
        TABLEALL(
           CUSTOMER_ID,
           BOOKDATE,
           BOOKTIME,
           PERSONS,
           REST_NAME
        )
        VALUES(
            :id,
            :datess,
            :hourss,
            :num,
            :rest
        )
    `;
  return await database.execute(
    sql,
    [id, datess, hourss, num, rest],
    database.options
  );
}

async function insertApproveTable(id, datess, hourss, rest, num) {
 
  let sql = `
        INSERT INTO
        TABLEAPPROVE(
           CUSTOMER_ID,
           BOOKDATE,
           BOOKTIME,
           PERSONS,
           REST_NAME
        )
        VALUES(
            :id,
            :datess,
            :hourss,
            :num,
            :rest
        )
    `;
  return await database.execute(
    sql,
    [id, datess, hourss, num, rest],
    database.options
  );
}

async function gettrans(id, rest) {
  let sql = `
      
select * from PLACEDORDER O,ALLINFO A
WHERE   O.ORDER_ID=A.ORDER_ID 
AND O.ORDER_ID IN (SELECT ORDER_ID FROM PLACEDORDER WHERE CUSTOMER_ID =:id AND RESTAURANT_ID =:rest)
ORDER BY O.ORDER_ID
       
    `;
  return (await database.execute(sql, [id, rest], database.options)).rows;
}

async function getFOODS(id) {
  console.log(id);
  let sql = `
select * from INORDER O, MENU M WHERE   O.FOOD_ID = M.FOOD_ID 
AND O.ORDER_ID = :id


       
    `;
  return (await database.execute(sql, [id], database.options)).rows;
}

async function gettransAdmin(rest) {
  let sql = `
      
select * from PLACEDORDER O,ALLINFO A
WHERE   O.ORDER_ID=A.ORDER_ID 
AND O.ORDER_ID IN (SELECT ORDER_ID FROM PLACEDORDER WHERE  RESTAURANT_ID =:rest)
ORDER BY O.ORDER_ID
       
    `;
  return (await database.execute(sql, [rest], database.options)).rows;
}

async function getApproveTable() {
  let sql = `
      
select * from TableApprove
ORDER BY REST_NAME
       
    `;
  return (await database.execute(sql, [], database.options)).rows;
}

async function getWaitTable() {
  let sql = `     
select * from TableALL
ORDER BY REST_NAME
       
    `;
  return (await database.execute(sql, [], database.options)).rows;
}

async function getinfoWaitTable(id) {
  let sql = `     
select * from TableALL
WHERE BOOKING_ID=:id
       
    `;
  return (await database.execute(sql, [id], database.options)).rows;
}

async function Deletetable(id) {
  let sql = `
       DELETE
        FROM TABLEALL
        WHERE BOOKING_ID = :id 
    `;

  return await database.execute(sql, [id], database.options);
}

async function insertMessage(id, ty, test, num, rest) {
  let sql = `
        INSERT INTO
        MESSAGE(
           CUSTOMER_ID,
           MSG_TYPE,
           TEXT,
           MSG_TIME,
           MSGID,
           REST
        )
        VALUES(
            :id,
            :ty,
            :test,
            SYSDATE,
            :num,
            :rest
            
        )
    `;
  return await database.execute(
    sql,
    [id, ty, test, num, rest],
    database.options
  );
}

async function getMessage(id, i) {
  let sql = `     
select * from MESSAGE
WHERE CUSTOMER_ID=:id
AND REST=:i
ORDER BY MSG_TIME DESC
       
    `;
  return (await database.execute(sql, [id, i], database.options)).rows;
}

module.exports = {
  insertTable,
  gettrans,
  getFOODS,
  gettransAdmin,
  getWaitTable,
  getApproveTable,
  getinfoWaitTable,
  insertApproveTable,
  Deletetable,
  insertMessage,
  getMessage,
};
