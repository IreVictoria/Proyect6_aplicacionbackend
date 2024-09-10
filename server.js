//Patrón vista.
//Importar librerias a utilizar
const express = require("express"); 
const cors = require(`cors`);

// Importar conexion a la base de datos 
const connectDB = require(`./config/db`); 

const app = express(); 
require(`dotenv`).config(); 

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Invocar funcion para la conexion de base de datos 
connectDB(); 

//Importar la gestión de rutas
const routes = require (`./routes/index.js`);
app.use(process.env.URL_BASE + `/`, routes);  

app. listen(process.env.PORT || 3000, () => {
    console.log(`listen in port ${process.env.PORT}`);
}); 