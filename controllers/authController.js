// Importar librerías a utilizar. 
const User = require (`../models/userModel`); 
const bcryptjs = require (`bcryptjs`); // biblioteca para poder encriptar la contraseña
const jwt = require(`jsonwebtoken`); 

require (`dotenv`).config(); 

// Función para que el usuario se pueda registrar con su password encriptada.
const signUp = async (req, res) => {
    try {
        const {name, username, password, active} = req.body; 
        const salt = await bcryptjs.genSalt(parseInt(process.env.SALT || 10)); 
        const hashedPassword = await bcryptjs.hash(password, salt); 

        const newUser = await User.create({
            name, 
            username,
            password: hashedPassword, // Password encriptada
            active,
        });
        res.status(201).json(newUser); 
    }catch (error){
        console.error(error);
        res.status(500).json({ message: `Error al dar de alta al usuario`});
    }
}

// Funcion para autentificar al usuario 
const signIn = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: `Usuario o password incorrecto` });

        }
        const passwordCorrect = await bcryptjs.compare(password, user.password);  
        if (!passwordCorrect) {
            return res.status(400).json({ message: `Usuario o password incorrecto` });
        }

        if(!user.active) {
            return res.status(400).json({ message: `Usuario inactivo, contacte al administrador`});
        }
        
        const payload = { user: { id: user.id } };

        jwt.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn: 3_600_000 // fecha de expiracion del token que solo dura una 1 hora.

            },
            (error, token) => { 
                if (error) throw error;
                res.status(200).json({ token });  
            }     
        );
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error al iniciar sesión del usuario`});
    }

}; 
 

    



module.exports = { signUp, signIn }; 
