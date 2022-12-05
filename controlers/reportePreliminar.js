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
  console.log(data);
  let results;
  let transaction;
  try {
    transaction = await pool.transaction();
    await transaction.begin();
    const request = await transaction.request();

    //querys

    resultsEmpresa = await request.query(
      `INSERT INTO [dbo].[EMPRESA]
      ([NOMBRE]
      ,[GIRORAMOSECTOR]
      ,[RFC]
      ,[COLONIA]
      ,[CODIGOPOSTAL]
      ,[CIUDAD]
      ,[FAX]
      ,[TELEFONO]
      ,[EXTENSION]
      ,[NOMBRETITULAR]
      ,[PUESTOTITULAR])
          VALUES
      (\'${data.PortadaEmpresaNombre}\',
      \'${data.EmpresaGiroRamoSector}\',
      \'${data.EmpresaRFC}\',
      \'${data.EmpresaColonia}\',
      \'${data.EmpresaCodigoPostal}\',
      \'${data.EmpresaCiudad}\',
      \'${data.EmpresaFax}\',
      \'${data.EmpresaTelefono}\',
      \'${data.EmpresaExt}\',
      \'${data.EmpresaNombreTitular}\',
      \'${data.EmpresaPestoTitular}\'); SELECT SCOPE_IDENTITY() AS id; `
    );

    console.log("resultados de query empresa", resultsEmpresa);

    resultsAExterno = await request.query(` INSERT INTO [dbo].[ASESOR_EXTERNO]
    ([NOMBRE]
    ,[PUESTO]
    ,[AREA]
    ,[CORREO]
    ,[TELEFONO]
    ,[ID_EMPRESA])
        VALUES
    (\'${data.AExternoNombre}\',
    \'${data.AExternoPuesto}\',
    \'${data.AExternoAreaEmpresa}\',
    \'${data.AExternoCorreo}\',
    \'${data.AExternoNumTelefono}\',
    \'${resultsEmpresa.recordset[0].id}\'); SELECT SCOPE_IDENTITY() AS id;`);

    let resultsproyecto = await request.query(` INSERT INTO [dbo].[PROYECTO]
    ([ProyectoTITULO]
    ,[ProyectoRealizacion]
    ,[ID_ASESOR_EXTERNO]
    ,[ID_EMPRESA]
    ,[ID_STATUS])
        VALUES
    (\'${data.PortadaProyectoNombre}\',
    \'${data.PortadaProyectoRealizacion}\',
    \'${resultsAExterno.recordset[0].id}\',
    \'${resultsEmpresa.recordset[0].id}\',
    1); SELECT SCOPE_IDENTITY() AS id; `);

    let queryAsesoresInternosPropuestos = "";

    data.PortadaAsesoresInternosPropuestos.forEach(async (element) => {
      queryAsesoresInternosPropuestos += `INSERT INTO [dbo].[INTERNOS_PROPUESTOS](ID_INTERNO, ID_PROYECTO) VALUES (\'${element.ID_INTERNO}\',\'${resultsproyecto.recordset[0].id}\');`;
    });

    await request.query(queryAsesoresInternosPropuestos);

    let resultsResidente = await request.query(`INSERT INTO [dbo].[ALUMNOS]
    ([NO_CONTROL]
    ,[NOMBRE]
    ,[APELLIDO_PATERNO]
    ,[CARRERA]
    ,[DOMICILIO]
    ,[COLONIA]
    ,[CODIGOPOSTAL]
    ,[CIUDAD]
    ,[PAIS]
    ,[SEGURIDADSOCIAL]
    ,[NUMSEGURIDADSOCIAL]
    ,[GENERO]
    ,[CORREOINSTITUCIONAL]
    ,[CORREOPERSONAL]
    ,[NUMEROCELULAR]
    ,[TELEFONOCASA]
    ,[FECHA_NACIMIENTO])
        VALUES
    (
    \'${data.ResidenteNoControl}\',
    \'${data.ResidenteNombre}\',
    \'${data.ResidenteApellido}\',
    \'${data.ResidenteCarrera}\',
    \'${data.ResidenteDomicilio}\',
    \'${data.ResidenteColonia}\',
    \'${data.ResidenteCodigoPostal}\',
    \'${data.ResidenteCiudad}\',
    \'${data.ResidentePais}\',
    \'${data.ResidenteSeguridadSocialAcudir}\',
    \'${data.ResidenteNumerodeSeguridadSocial}\',
    \'${data.ResidenteSexo}\',
    \'${data.ResidenteCorreoInstitucional}\',
    \'${data.ResidenteCorreoPersonal}\',
    \'${data.ResidenteNumCelular}\',
    \'${data.ResidenteTelefonoCasa}\',
    \'01/01/01\');`);

    let resultReportePreliminar =
      await request.query(`INSERT INTO [dbo].[REPORTE_PRELIMINAR]
    ([OBJETIVOPROYECTO]
    ,[OBJETIVOSESPECIFICOS]
    ,[DELIMITACION]
    ,[JUSTIFICACION]
    ,[CRONOGRAMAACTIVIDADES]
    ,[ID_PROYECTO])
        VALUES
    ( \'${data.RepPreObjetivoProyeto}\',
      \'${data.RepPreObjetivosEspecificos.join(",")}\',
      \'${data.RepPreDelimitacionProyecto}\',
      \'${data.RepPreJustificacionProyecto}\',
      \'${data.RepPreCronogramaActividades.join(",")}\',
      \'${resultsproyecto.recordset[0].id}\')`);

    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    console.log(err);
    throw err;
  }

  res.sendStatus(200);
};

module.exports = { GetReadReportes, PostCreateReporte };
