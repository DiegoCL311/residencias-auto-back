//import { getConn } from "../database/connection";
//const sql = require("mssql");
const { getConn } = require("../database/connection");

const GetReadReportes = async function (req, res) {
  let pool = await getConn();

  let result = await pool.request().query("SELECT 1");

  //console.log(result);

  res.send(result);
};

const PostCreateReporte = async function (req, res) {
  let pool = await getConn();

  //console.log(req.body);
  let data = req.body;
  let results
  let transaction;
  try {
      //console.log("entrooooo, pool", pool);
      transaction = await pool.transaction();
      //console.log("transaction creada", transaction);

      await transaction.begin();
      //console.log("transaction iniciada", transaction);

      const request = await transaction.request();
      //console.log("request creada", request);


      //querys
      results = await request.query("SELECT 1 as Numero");
      //console.log("query creada", transaction);
      //console.log("resultado", result);



      await transaction.commit();

      //console.log("Transaction commited");
  } catch (err) {
      //await transaction.rollback();
      console.log(err);
      //throw err;
  }
  res.send(results);
};

module.exports = { GetReadReportes, PostCreateReporte };
