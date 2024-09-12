// Implementar el ruteo de los usuarios 
const express = require(`express`); 
// Importamos el ruteador. 
const  userRouter = express.Router(); 
// Importar middleware.
const auth = require(`../middleware/authorization`); 

// Importar el controlador.
const { getAllUser, getUserById,  updateUser, deleteUser, verifyUser } = require (`../controllers/userController`);

userRouter.get(`/`, getAllUser); 
userRouter.get(`/:id`, getUserById); 
userRouter.put(`/:id`, auth, updateUser);
userRouter.delete(`/:id`, auth, deleteUser);
userRouter.get('/verify', verifyUser)

module.exports = userRouter;