// Implementar el ruteo de los productos.
const express = require(`express`); 
// Importamos el ruteador. 
const productRouter = express.Router(); 

//Importar el controlador. 
const { createProduct, getAllProduct, getProductById, updateProduct, deleteProduct } = require("../controllers/productController");

productRouter.post(`/`, createProduct)
productRouter.get(`/`,  getAllProduct); 
productRouter.get(`/:id`, getProductById);
productRouter.put(`/:id`, updateProduct);
productRouter.delete(`/:id`, deleteProduct);

module.exports = productRouter; 