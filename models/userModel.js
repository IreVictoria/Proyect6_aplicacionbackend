//Implementar esquema de modelo de usuarios. 
const mongoose = require(`mongoose`);
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        username: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            require: true,
        },
        active: {
            type: Boolean,
            require: false, // quiere decir que no es un dato requerido
            default: false, // y si no viene le ponemos que es falso 
        },
    },
    {
        timestamps:true,
    }
); 

const User= mongoose.model(`User`, userSchema );  

module.exports= User; 