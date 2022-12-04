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
      ` INSERT INTO [dbo].[PROYECTO] 
              ([ProyectoTITULO],[ProyectoAREA],[ProyectoRealizacion],[ID_ASESOR_INTERNO],[ID_ASESOR_EXTERNO],[ID_EMPRESA])
       VALUES (<ProyectoTITULO, nvarchar(80),> ,<ProyectoAREA, nvarchar(50),> ,<ProyectoRealizacion, nvarchar(50),>,<ID_ASESOR_INTERNO, int,> ,<ID_ASESOR_EXTERNO, int,> ,<ID_EMPRESA, int,>) `
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
