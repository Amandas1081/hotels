const express = require("express");


const app = express();
const db=require('./db');
const MenuItem= require('./models/MenuItem');
// const Person =require('./models/Person');
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const PORT = 3000;
app.get('/', (req, res) => {
    res.send('welcone to my hotel');
});



const personRoutes=require('./routes/personRoutes');
app.use('/person',personRoutes);

const menuRoutes=require('./routes/menuItemRoutes');
app.use('/menu',menuRoutes);

app.listen(PORT, () => console.log(`Server Started at Port${PORT}`));