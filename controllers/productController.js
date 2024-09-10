// Importar modelo de productos.
const Product = require (`../models/productsModel`); 

// implementar peticiones CRUD. 
//Función para crear un producto. 
exports.createProduct = async (req, res) => {
    try {
        const { name, price, decription, image, stock } = req.body;
        const nuevoProducto = await Product.create({ name, price, decription, image, stock });
        res.json(nuevoProducto);
        console.log(nuevoProducto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error creando un producto` });
    }
};

// b.- Función para obtener todos los producto registrados
exports.getAllProduct = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({ products });
        console.log(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error obteniendo los productos`, error });
    }
};

//c.- Función para obtener un producto por id
exports.getProductById = async (req, res) => {
    try{
        const producto = await Product.findById(req.params.id);
        res.json({ producto });

    }catch (error){
        console.error(error);
        res.status(500).json({ message: `Error obteniendo al producto`});
    }
}; 

//d.- Función para actualizar los datos de un producto. 

exports.updateProduct = async (req, res) => {
    try {
        const { name, price, decription, image, stock } = req.body;
        const productoActualizado = await Product.findByIdAndUpdate(req.params.id, { name, price, decription, image, stock }, { new: true });
        res.json(productoActualizado);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error actualizando un producto` });
    }
};

//e.- Función para elminar un producto por id

exports.deleteProduct = async (req, res) => {
    try {
        const productoEliminado = await Product.findByIdAndDelete(req.params.id);
        res.json(productoEliminado);

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: `Error eliminando un producto` });


    }
}; 


