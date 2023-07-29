const express =  require('express');//const que es nuestra libreria de express
const app = express(); // inicializamos la variable express
const db = require('./db/conn');//conexion a la base de datos

app.use(express.json()); //le decimos a la app que trabaje con lenguaje de json



app.post('/api/heroes', (req, res) => {

    let datos = [

        req.body.nombre,
        req.body.identidad_secreta

    ];

    let sql = ` insert into tbl_heroes
                (nombre, identidas_secreta)
                values
                ($1, $2) returning id 
                `;

    db.one(sql, datos, event => event.id)
        .then(data => {

            const objetoCreado = {

                id: data,
                nombre: datos[0],
                identidad_secreta: datos[1]

            }

            res.json(objetoCreado);

        })
        .catch((error) => {

            res.json(error);

        });



});

app.get('/api/heroes',(req, res)=>{

    let sql ="select * from tbl_heroes";

    db.any(sql , e => e.id)
    .then (rows =>{
        res.json(rows);
    })
    .catch((error)=>{
        res.json(error);
    })
})

app.listen(3000);