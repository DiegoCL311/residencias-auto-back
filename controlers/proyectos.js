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

const GetProyectoID = async function (req, res) {
  let pool = await getConn();

  let id = req.params.id;
  let results;
  let transaction;

  try {
    transaction = await pool.transaction();
    await transaction.begin();
    const request = await transaction.request();

    //querys
    results = await request.query(
      `SELECT P.*, E.NOMBRE AS EMPRESA_NOMBRE, AE.NOMBRE AS EXTERNO_NOMBRE 
        FROM PROYECTO AS P
        INNER JOIN EMPRESA AS E ON P.ID_EMPRESA = E.ID_EMPRESA
        INNER JOIN ASESOR_EXTERNO AS AE ON P.ID_ASESOR_EXTERNO = AE.ID_EXTERNO
        WHERE ID_PROYECTO = ` + id
    );

    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    console.log(err);
    throw err;
  }
  res.send(results);
};

module.exports = { GetProyectos, GetProyectoID };
