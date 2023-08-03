const express =  require('express');//const que es nuestra libreria de express
const app = express.Router();
const db = require('../db/conn');//conexion a la base de datos

//tabla heroes_poder

app.post('', (req, res) => {

    let datos = [

        req.body.id_heroes,
        req.body.id_poderes
    ];

    let sql = ` insert into tbl_heroes_poder
                (id_heroes, id_poderes)
                values
                ($1,$2) returning id 
                `;

    db.one(sql, datos, event => event.id)
        .then(data => {

            const objetoCreado = {

                id: data,
                id_heroes: datos[0],
                id_poderes: datos[1]

            }

            res.json(objetoCreado);

        })
        .catch((error) => {

            res.json(error);

        });

});

app.get('',(req, res)=>{

    let sql ="select * from tbl_heroes_poder where activo = true";

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
        req.body.id_heroes,
        req.body.id_poderes,
        req.params.id
    ];

    let sql = `update tbl_heroes_poder
                set id_heroes = $1,
                    id_poderes = $2
                where id = $3`;

    db.result(sql,parametros,r => r.rowCount) 
    .then(data=>{
        const objetoModificado = {  id: req.params.id,
                                    id_heroes: req.body.id_heroes,
                                    id_poderes: req.body.id_poderes}
        res.json(objetoModificado);
    })
    .catch((error)=>{
        res.json(error);
    })
})

app.delete('/:id', (req,res)=>{



    let sql = `update tbl_heroes_poder
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

module.exports=app;