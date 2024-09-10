// Importar userModel.
const User = require(`../models/userModel`);

// implementar peticiones CRUD. 
//Función para crear un usuario. 
exports.createUser = async (req, res) => {
    try {
        const { name, username, password, active } = req.body;
        const nuevoUsuario = await User.create({ name, username, password, active });
        res.json(nuevoUsuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error creando un usuario` });
    }
};

//b.- Función para obtener todos los usuario registrados
exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find({});
        res.json({ users });
        console.log(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error obteniendo los usuarios`, error });
    }
};

//c.- Función para obtener un usuario por id
exports.getUserById = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        res.json({ user });

    }catch (error){
        console.error(error);
        res.status(500).json({ message: `Error obteniendo al usuario`});
    }
}; 

//d.- Función para actualizar los datos de un usuario. 

exports.updateUser = async (req, res) => {
    try {
        const { name, username, password, active } = req.body;
        const usuarioActualizado = await User.findByIdAndUpdate(req.params.id, { name, username, password, active }, { new: true });
        res.json(usuarioActualizado);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error actualizando un usuario` });
    }
};

//e.- Función para elminar un usuario por id

exports.deleteUser = async (req, res) => {
    try {
        const usuarioEliminado = await User.findByIdAndDelete(req.params.id);
        res.json(usuarioEliminado);

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: `Error eliminando un usuario` });


    }
}; 