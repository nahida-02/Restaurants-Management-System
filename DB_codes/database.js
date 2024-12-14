const oracledb = require("oracledb");
oracledb.autoCommit = true;

async function startup() {
    console.log('starting up database.');
    await oracledb.createPool({
        user:"C##NEW",
        password:  "123",
        connectstring:  "",
        poolMin: 4,
        poolMax: 10,
        poolIncrement: 1
    });
    console.log('pool created');


}


async function shutdown() {
  console.log("shutting down database.");
  try {
    
    await oracledb.getPool().close(10);
    console.log("Pool closed");
  } catch (err) {
    console.log("ERROR shutting down database: " + err.message);
  }
}



async function execute(sql, binds, options) {
    let connection, results;
    try {
        
        connection = await oracledb.getConnection();
        results = await connection.execute(sql, binds, options);
    } catch (err) {
        console.log("ERROR executing sql: " + err.message);
    } finally {
        if (connection) {
            try {
               
                await connection.close();
            } catch (err) {
                console.log("ERROR closing connection: " + err);
            }
        }
    }

    return results;
}

async function executeMany(sql, binds, options) {
    let connection;
    try {
        
        connection = await oracledb.getConnection();
        await connection.executeMany(sql, binds, options);
    } catch (err) {
        console.log("ERROR executing sql: " + err.message);
    } finally {
        if (connection) {
            try {
                
                await connection.close();
            } catch (err) {
                console.log("ERROR closing connection: " + err);
            }
        }
    }

    return;
}




const options = {
  outFormat: oracledb.OUT_FORMAT_OBJECT,
};





module.exports = {
  startup,
  shutdown,
  execute,
  executeMany,
  options,
};