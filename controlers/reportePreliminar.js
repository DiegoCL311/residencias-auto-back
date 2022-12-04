//import { getConn } from "../database/connection";
//const sql = require("mssql");
const { getConn } = require("../database/connection");

const GetReadReportes = async function (req, res) {
  let pool = await getConn();

  let data = req.body;
  let results;
  let transaction;

  try {
    transaction = await pool.transaction();
    await transaction.begin();
    const request = await transaction.request();

    //querys
    results = await request.query("SELECT * FROM REPORTE_PRELIMINAR");

    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    console.log(err);
    throw err;
  }
  res.send(results);
};

const PostCreateReporte = async function (req, res) {
  let pool = await getConn();

  let data = req.body;
  let results;
  let transaction;
  try {
    transaction = await pool.transaction();
    await transaction.begin();
    const request = await transaction.request();

    console.log(data);

    //querys
    results = await request.query(
      `  `
    );

    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    console.log(err);
    throw err;
  }
  res.send(results);
};

module.exports = { GetReadReportes, PostCreateReporte };
