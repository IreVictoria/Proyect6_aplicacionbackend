// Función para implementar autorización al usuario 
const jwt = require (`jsonwebtoken`); 

require(`dotenv`).config(); 

module.exports = (req, res, next) => {
    let { authorization } = req.headers; 
    if (!authorization) {
        return res.status(401).json({ message: `Lo sentimos, acceso no autorizado`}); 

    } try {
        let [type, token] = authorization.split(" ");
        if (type.toLowerCase() === `token`|| type === `Bearer`) {
            const openToken = jwt.verify(token, process.env.SECRET); 

         req.user = openToken.user;
         next();

        } else {
            res.status(401).json({ message: `Lo sentimos, acceso no autorizado`});
        }
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: `Ocurrió un error`});
    }
}; 