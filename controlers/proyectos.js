const { getConn } = require("../database/connection");

const GetProyectos = async function (req, res) {
  let pool = await getConn();

  let data = req.body;
  let results;
  let transaction;

  try {
    transaction = await pool.transaction();
    await transaction.begin();
    const request = await transaction.request();

    //querys
    results = await request.query("SELECT * FROM PROYECTO");

    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    console.log(err);
    throw err;
  }
  res.send(results);
};


module.exports = {GetProyectos};