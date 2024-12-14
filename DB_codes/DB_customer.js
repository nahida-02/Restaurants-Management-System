const database = require("./database");

async function getBkashPhone(id,param) {
  let sql = `
  DECLARE
  res VARCHAR2(100);
        BEGIN
          res:=  GET_BKASH(:id,:param);
        END;
    `;
  return await database.execute(sql, [id,param], database.options);
}


async function getCreditInfo(id, param) {
  let sql = `
  DECLARE
  res VARCHAR2(100);
        BEGIN
          res:=  GET_CREDIT_CARD(:id,:param);
        END;
    `;
  return await database.execute(sql, [id, param], database.options);
}






module.exports = {
  getBkashPhone,
  getCreditInfo,
};
