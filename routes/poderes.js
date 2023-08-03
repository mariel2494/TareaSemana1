const express =  require('express');//const que es nuestra libreria de express
const app = express.Router();
const db = require('../db/conn');//conexion a la base de datos



//tabla poderes
app.post('', (req, res) => {

    let datos = [

        req.body.nombre
       

    ];

    let sql = ` insert into tbl_poderes
                (nombre)
                values
                ($1) returning id 
                `;

    db.one(sql, datos, event => event.id)
        .then(data => {

            const objetoCreado = {

                id: data,
                nombre: datos[0],
                

            }

            res.json(objetoCreado);

        })
        .catch((error) => {

            res.json(error);

        });



});

app.get('',(req, res)=>{

    let sql ="select * from tbl_poderes where activo = true";

    db.any(sql , e => e.id)
    .then (rows =>{
        res.json(rows);
    })
    .catch((error)=>{
        res.json(error);
    })
})


app.put('/:id', (req,res)=>{

    const parametros = [
        req.body.nombre,
        req.params.id
    ];

    let sql = `update tbl_poderes
                set nombre = $1
                where id = $2`;

    db.result(sql,parametros,r => r.rowCount) 
    .then(data=>{
        const objetoModificado = {  id: req.params.id,
                                    nombre: req.body.nombre}
        res.json(objetoModificado);
    })
    .catch((error)=>{
        res.json(error);
    })
})

app.delete('/:id', (req,res)=>{



    let sql = `update tbl_poderes
                set activo = false,
                    fecha_borrar = current_timestamp
                where id = $1`;

    db.result(sql,[req.params.id],r => r.rowCount) 
    .then(data=>{
        const objetoBorrado = {  id: req.params.id,
                                    nombre: req.params.id, 
                                    activo : false};
        res.json(objetoBorrado);
    })
    .catch((error)=>{
        res.json(error);
    })
})


module.exports = app;