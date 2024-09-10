// Implementar ruta de signup y signin. 
const express = require(`express`); 
const authRouter = express.Router(); 

const { signUp, signIn } = require(`../controllers/authController`); 

authRouter.post(`/signup`, signUp); 
authRouter.post(`/signin`, signIn); 

module.exports = authRouter; 

