
const { isSet } = require("util/types");
const conexion = require("./bdata");
const EXPRESSJS = require("express");
const date = EXPRESSJS.Router();

//Desarrollo del CRUD


//Consultar todos

date.get("/date/listing", (req, res) => {
    conexion.query(`SELECT 
    
    hospisoft_cita.idcita as id,
    hospisoft_cita.fecha,
    hospisoft_cita.razon,
    hospisoft_paciente.nombrepaciente as Paciente,
    hospisoft_medico.nombreMedico as Medico
    FROM 
    hospisoft_cita
INNER JOIN 
    hospisoft_medico ON hospisoft_medico.IdMedico = hospisoft_cita.idmedico
INNER JOIN 
    hospisoft_paciente ON hospisoft_paciente.idPaciente = hospisoft_cita.idpaciente
;`, (error, datos) => {
     
      try {
        res.status(200).send(datos);
      }
        catch (err) {
          res.status(404).send({
           codigo: "No se ha encontrado el inventario",
            id: error.code,
            mensaje: error.message
            
                })
        }
    
     
   
    });
  });
  

  date.post("/date/create", (req, res) => {

   
    let frmdata = {
    
      razon: req.body.razon,
      idMedico: req.body.idmedico,
      idPaciente: req.body.idpaciente,
      fecha: req.body.fecha,
      id: req.body.id,


    };


console.log(frmdata)
 


    conexion.query(
    `INSERT INTO hospisoft_formula (consecutivo,idMedico, idPaciente, fecha) VALUES (null,${frmdata.idMedico}, ${frmdata.idPaciente},'${ frmdata.fecha}');
    SET @last_id = LAST_INSERT_ID();
    INSERT INTO hospisoft_detalleformula (Iddetalle,iditem, cantidad, posologia, formula) VALUES (null,${frmdata.iditem}, ${frmdata.cantidad}, '${frmdata.posologia}', @last_id);`,

 

      frmdata,
      (error, data) => {
      
if(isSet(error) != null){

          res.status(200).send({
            status: "ok",
            mensaje: "Operación exitosa",
          });
}else{
  console.log(error); 
  res.status(404).send({
    status: "error",
    mensaje: "Error en la insercion",

  });
}
      
  
        
        
      }


      
    );

 


  
  });

  date.post("/date/edit", (req, res) => {
    let frmdata = {
    
      consecutivoformula: req.body.consecutivo,
      Iddetalle: req.body.detalle,
      idMedico: req.body.idmedico,
      idPaciente: req.body.idpaciente,
      fecha: req.body.fecha,
      iditem: req.body.item,
      cantidad: req.body.cantidad,
      posologia: req.body.posologia,

    };
    console.log(frmdata)
    conexion.query(
      `update  hospisoft_formula SET  idMedico = ${frmdata.idMedico} , idPaciente=${frmdata.idPaciente},fecha = '${frmdata.fecha}' where consecutivo = ${frmdata.consecutivoformula};
      update hospisoft_detalleformula SET iditem =  ${frmdata.iditem}, cantidad =  ${frmdata.cantidad}, posologia =  '${frmdata.posologia}' where Iddetalle =  ${frmdata.Iddetalle};
      `,
      frmdata,
      (error, data) => {

          res.status(200).send({
            status: "ok",
            mensaje: "Operación exitosa",
          });
     if(error){
      
      console.log(error);
  
      res.status(404).send({
        status: "error",
        mensaje: "Error en la insercion",
   
      });
     }
        
      }
    );


  });
  
  module.exports = date;
