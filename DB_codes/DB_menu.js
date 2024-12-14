const database = require("./database");
async function getUserByUsername(username) {
  let sql = `
        SELECT *
        FROM CUSTOMER
        WHERE USERNAME = :USERNAME
    `;
  return (await database.execute(sql, [username], database.options)).rows;
}

async function getMenuByID(RESTAURANT_ID, FOOD_TYPE) {
  let sql = `
        SELECT * 
        FROM MENU 
        WHERE
        RESTAURANT_ID=:RESTAURANT_ID
        AND FOOD_TYPE=:FOOD_TYPE
    `;
  return (
    await database.execute(sql, [RESTAURANT_ID, FOOD_TYPE], database.options)
  ).rows;
}

async function getFoodByID(FOOD_ID) {
  let sql = `
        SELECT * 
        FROM MENU 
        WHERE
        FOOD_ID=:FOOD_ID
    `;
  return (await database.execute(sql, [FOOD_ID], database.options)).rows[0];
}

async function getRestaurantByID(FOOD_ID) {
  let sql = `
        SELECT *
        FROM MENU 
        WHERE
        FOOD_ID=:FOOD_ID
       
    `;
  return await database.execute(sql, [FOOD_ID], database.options).rows;
}

async function getPopular(RESTAURANT_ID) {
  let sql = `
        SELECT *
        FROM MENU M LEFT JOIN OFFER O 
        ON M.FOOD_ID=O.FOOD_ID
        WHERE
        M.RESTAURANT_ID=:RESTAURANT_ID
        AND M.RATING IS NOT NULL
        ORDER BY M.RATING DESC
        FETCH NEXT 3 ROWS ONLY
    `;
  return (await database.execute(sql, [RESTAURANT_ID], database.options)).rows;
}

async function getOffers(RESTAURANT_ID) {
  let sql = `
       SELECT *
FROM MENU M , OFFER O
WHERE
M.FOOD_ID=O.FOOD_ID AND
M.RESTAURANT_ID=:RESTAURANT_ID
AND O.OFFER_PERCENT > 0
   
    `;
  return (await database.execute(sql, [RESTAURANT_ID], database.options)).rows;
}
// AND;
// SYSDATE > DATE_ACTIVE_FROM;
// AND;
// SYSDATE < DATE_ACTIVE_TO;
async function getOfferinMenu(RESTAURANT_ID, FOOD_TYPE) {
  let sql = `
  select *
from MENU M LEFT JOIN OFFER O 
ON M.FOOD_ID=O.FOOD_ID
WHERE M.RESTAURANT_ID=:RESTAURANT_ID
AND 
M.FOOD_TYPE=:FOOD_TYPE  
    `;
  return (
    await database.execute(sql, [RESTAURANT_ID, FOOD_TYPE], database.options)
  ).rows;
}

async function addProduct(
  no,
  rest,
  name,
  category,
  price,
  description,
  quantity,
  quantity,
  ty
) {
  let sql = `
        INSERT INTO
        MENU(
            FOOD_ID,
            RESTAURANT_ID,
            FOOD_NAME,
            CATEGORY,
            PRICE,
            DESCRIPTION,
            QUANTITY,
            STOCK,
            FOOD_TYPE
        )
        VALUES(
            :no,
            :rest,
            :name,
            :category,
            :price,
            :description,
            :quantity,
            :stock,
            :ty
        )
    `;

  return await database.execute(
    sql,
    [no, rest, name, category, price, description, quantity,quantity, ty],
    database.options
  );
}

async function getmaxfoodid() {
  let sql = `
  SELECT MAX(FOOD_ID) AS M
        FROM MENU
        
    `;
  return await database.execute(sql, [], database.options);
}

async function UpdateProduct(
  foodid,
  foodname,
  description,
  category,
  price,
  quantity,
  t
) {
  let sql = `
        BEGIN
        UPDATE_FOOD(:foodid,
     :foodname,
     :description,
     :category,
     :price,
     :quantity,
     :t);
        END;

    `;

  return await database.execute(
    sql,
    [foodid, foodname, description, category, price, quantity, t],
    database.options
  );
}
async function DeleteFoodByID(foodid) {
  let sql = `
       DELETE
        FROM MENU
        WHERE FOOD_ID = :foodid 
    `;

  return await database.execute(sql, [foodid], database.options);
}
async function createOffer(offerid, id, offf, fromm, tom) {
  let sql = `
        INSERT INTO
        OFFER(
          OFFER_ID,
           FOOD_ID,
           OFFER_PERCENT,
           DATE_ACTIVE_FROM,
           DATE_ACTIVE_TO
        )
        VALUES(
            :offerid,
            :id,
            :offf,
            TO_DATE(:fromm, 'yyyy-mm-dd'),
            TO_DATE(:tom, 'yyyy-mm-dd')
        )
    `;
  return await database.execute(
    sql,
    [offerid, id, offf, fromm, tom],
    database.options
  );
}

async function getmaxofferid() {
  let sql = `
  SELECT MAX(OFFER_ID) AS M
        FROM OFFER
        
    `;
  return await database.execute(sql, [], database.options);
}

async function FindOffer(RESTAURANT_ID) {
  let sql = `
  select *
from MENU M  JOIN OFFER O 
ON M.FOOD_ID=O.FOOD_ID
WHERE M.RESTAURANT_ID=:RESTAURANT_ID

    `;
  return (await database.execute(sql, [RESTAURANT_ID], database.options)).rows;
}

async function DeleteOffer(id) {
  let sql = `
       DELETE
        FROM OFFER
        WHERE OFFER_ID = :id 
    `;

  return await database.execute(sql, [id], database.options);
}

module.exports = {
  getMenuByID,
  getFoodByID,
  getRestaurantByID,
  getPopular,
  getOffers,
  getOfferinMenu,
  addProduct,
  getmaxfoodid,
  UpdateProduct,
  DeleteFoodByID,
  createOffer,
  getmaxofferid,
  FindOffer,
  DeleteOffer,
};
