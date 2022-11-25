const sql = require("mssql");
const config = require("./config.js");

const getConn = async () => {
try {
    
    const pool = await sql.connect(config);
    return pool;

} catch (error) {
    console.log(error);
}

}

module.exports = {
    getConn
};