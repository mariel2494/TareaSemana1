const express =  require('express');//const que es nuestra libreria de express
const app = express(); // inicializamos la variable express
app.use(express.json());//le decimos a la app que trabaje con lenguaje de json

const rutaHeroes= require('./routes/heroes');
app.use('/api/heroes', rutaHeroes);

const rutaPoderes= require('./routes/poderes');
app.use('/api/poderes', rutaPoderes);

const rutaHeroesPoderes= require('./routes/heroes_poderes');
app.use('/api/heroes_poderes', rutaHeroesPoderes);









app.listen(3000);