// Crear conexion a la base de datos
const mongoose = require(`mongoose`); 
require(`dotenv`).config(); 

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI, {});
        console.log(`Estamos conectados a la base de datos`); 
    }catch (error) {
        console.error(error);
        process.exit(1);

    }
}; 

module.exports = connectDB; 