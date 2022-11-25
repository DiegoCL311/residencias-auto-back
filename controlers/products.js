import { getConn } from "../database/connection";

const rutaGet = async function (req, res) {
  let pool = await getConn();
  let result = await pool.request().query("SELECT 1 as number");
  
  console.log(result);

  res.json(result);
  }


const rutaPost = function (req, res) {
    res.send("Respuesta de rutaPost");
    }


module.exports = { rutaGet, rutaPost };
