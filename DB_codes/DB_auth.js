const database = require("./database");
async function getUserByUsername(username) {
  let sql = `
        SELECT *
        FROM CUSTOMER
        WHERE USERNAME = :USERNAME
    `;
  return (await database.execute(sql, [username], database.options)).rows;
}
async function getCustomers() {
  let sql = `
        SELECT *
        FROM CUSTOMER
    `;
  return (await database.execute(sql, [], database.options)).rows;
}
async function getCustomerbyid(id) {
  let sql = `
        SELECT *
        FROM CUSTOMER
        WHERE ID=:id
    `;
  return (await database.execute(sql, [id], database.options)).rows;
}

async function getAdmin() {
  let sql = `
        SELECT *
        FROM ADMIN
    `;
  return (await database.execute(sql, [], database.options)).rows;
}
async function getUserByAdminUsername(username) {
  let sql = `
        SELECT *
        FROM ADMIN
        WHERE USERNAME = :USERNAME
    `;
  return (await database.execute(sql, [username], database.options)).rows;
}

async function insertAccountIntoDB(
  name,
  username,
  hashpassword,
  email,
  address
) {
  let sql = `
        INSERT INTO
        CUSTOMER(
            NAME,
            USERNAME,
            PASSWORD,
            EMAIL,
            ADDRESS,
            JOIN_DATE 
        )
        VALUES(
            :NAME,
            :USERNAME,
            :PASSWORD,
            :EMAIL,
            :ADDRESS,
            SYSDATE
        )
    `;
  return await database.execute(
    sql,
    [name, username, hashpassword, email, address],
    database.options
  );
}

async function insertAdminIntoDB(name, username, hashpassword, email, address) {
  
  let sql = `
        INSERT INTO
        ADMIN(
            NAME,
            USERNAME,
            PASSWORD,          
            EMAIL,
            ADDRESS,
            JOIN_DATE  
        )
        VALUES(
            :NAME,
            :USERNAME,
            :PASSWORD,         
            :EMAIL,
            :ADDRESS,
            to_date(TO_CHAR(sysdate, 'Month DD, YYYY'),'Month DD, YYYY')
        )
    `;
  return await database.execute(
    sql,
    [name, username, hashpassword, email, address],
    database.options
  );
}

module.exports = {
  getUserByUsername,
  insertAccountIntoDB,
  getUserByAdminUsername,
  insertAdminIntoDB,
  getCustomers,
  getAdmin,
  getCustomerbyid,
};
