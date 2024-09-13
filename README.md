[![banner.png](https://i.postimg.cc/mrG8Z2ck/banner.png)](https://postimg.cc/3kngnhFQ)

# Proyecto n°6: Aplicación backend con autenticación. 

<p>
  
En este proyecto se dará a conocer la construcción de una aplicación backend con autenticación, utilizando el lenguaje de programación en JavaScript implementado con `Node.js` y con su respectiva conexión a `Mongo dB`, que es un base de datos tipo `no SQL` el cual permitirá conectarse a dicha base de datos y poder realizar operaciones CRUD (crear, leer, actualizar y eliminar).  Este trabajo está realizado en el editor de código Visual Studio Code. A continuación, se mostrarán los requisitos del proyecto y el paso a paso de cómo se realizó la `Aplicación backend con autenticación.

</p>

------------


### Requisitos del proyecto. 


------------

- Crear una arquitectura de carpetas y archivos, clara.
  
- Implementar autenticación y autorización en tu aplicación.
  
- Crear dos modelos, uno para el Usuario y otro para el Producto.
  
- Implementar operaciones CRUD para el modelo del Producto.
  
- Utilizar MongoDB y Mongoose para gestionar la base de datos.
  
- Crear un repositorio en GitHub y subir el proyecto al mismo.


------------


### Construcción paso a paso de la aplicación. 


------------

1.- Instalar todas las `dependencias` requeridas para poder realizar la aplicación. 

imagen

2.- Establecer los `scripts` en el archivo de package.json. 

imagen.

3.- Estructurar proyecto por carpetas. 

imagen.

4.- A continuación se dará a conocer el código contenido en cada carpeta del proyecto. 

- Archivo server.js
  
```javascript
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

```

- Carpeta `config` que contendrá en el archivo `db.js` que es el código donde ser realiza la conexión a la base de datos.
  

```javascript
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

```

- Archivo `.env` que contiene las variables de entorno a utilizar en el proyecto.
  

```javascript
PORT =3000
MONGODB_URI = mongodb+srv://IreneVictoria:<db_password>@cluster0.pd5sz.mongodb.net/
URL_BASE =/api
SECRET= <secret>

```

- Carpeta `models` que en ella se encontrarán los modelos del usuario y del producto.
  
*Modelo usuario:


```javascript
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

```

*Modelo Producto.


```javascript
// Esqueme modelo de productos 
const mongoose = require(`mongoose`);
const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        price: {
            type: Number,
            require: true,
        },
        description: {
            type: String,
            require: false,
        },
        image: {
            type: Number,
        },
        stock: {
            type: Number,
            require: true,
        }
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model(`Product`, productSchema);
module.exports = Product;

```

- Carpeta `controllers` que en ella contiene los siguientes archivos:
  
*userControlles.js
  

```javascript
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

/*//c.- Función para obtener un usuario por id
exports.getUserById = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        res.json({ user });

    }catch (error){
        console.error(error);
        res.status(500).json({ message: `Error obteniendo al usuario`});
    }
};*/ 

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
 
/*//verficar token. 
exports.verifyUser = async (req, res) => {
	try {
		// confirmamos que el usuario exista y 
		//retorna sus datos, excluyendo de password
		const verifyUsuario = await User.findByToken(req.user.id).select('-password')
		res.json({ verifyUsuario })
	} catch (error) {
		// en caso de error, devolvemos un mensaje
		res.status(500).json({
			msg: "Houston tenemos un problema",
			error
		})
	}
}*/

// Verificar token
exports.verifyUser = async (req, res) => {
    try {
        // Obtener el token del encabezado de autorización
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }
 
        // Decodificar el token
        const decoded = jwt.verify(token, 'SOFI'); // Reemplaza 'your_jwt_secret' con tu clave secreta
 
        // Buscar al usuario por ID y excluir el campo de contraseña
        const verifyUsuario = await User.findById(decoded.id).select('-password');
        if (!verifyUsuario) {
            return res.status(404).json({ msg: 'User not found' });
        }
 
        // Devolver los datos del usuario
        res.json({ verifyUsuario });
    } catch (error) {
        // Manejar errores
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ msg: 'Token is not valid' });
        }
        res.status(500).json({
            msg: "Houston tenemos un problema",
            error
        });
    }
}

```

*productController.js


```javascript
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



```


*authController.js-:


```javascript
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

```

- Carpeta `routes` que contiene las siguientes rutas:
  
*userRoutes.js:


```javascript
// Implementar el ruteo de los usuarios 
const express = require(`express`); 
// Importamos el ruteador. 
const  userRouter = express.Router(); 
// Importar middleware.
const auth = require(`../middleware/authorization`); 

// Importar el controlador.
const { getAllUser, getUserById,  updateUser, deleteUser, verifyUser } = require (`../controllers/userController`);

userRouter.get(`/`, getAllUser); 
/*userRouter.get(`/`, getUserById); */
userRouter.put(`/:id`, auth, updateUser);
userRouter.delete(`/:id`, auth, deleteUser);
userRouter.get('/verify', verifyUser);

module.exports = userRouter;


```

*productRoutes.js: 


```javascript
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


```

*authRoutes.js: 


```javascript
// Implementar ruta de signup y signin. 
const express = require(`express`); 
const authRouter = express.Router(); 

const { signUp, signIn } = require(`../controllers/authController`); 

authRouter.post(`/signup`, signUp); 
authRouter.post(`/signin`, signIn); 

module.exports = authRouter; 


```

*Archivo `index.js` esta carpeta contiene todo el ruteo de los otros tres archivos de esta manera queda más ordenado el código: 


```javascript
const express = require(`express`); 
const router = express.Router();

const userRouter = require(`./userRoutes`); 
const authRouter = require(`./authRoutes`);
const productRouter = require(`./productRoutes`);


router.use(`/users`, userRouter); 
router.use(`/`, authRouter); 
router.use(`/products`, productRouter);



module.exports = router;


```

- Y por último tenemos la carpeta `middleware` que contiene el código de autorización al usuario:


```javascript
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

```

### Implementar endpoints de usuarios en thunder client. 

1.- Registro de un usuario. 

imagen 

2.- Usuario pueda iniciar sesión. 

imagen

3.-  Verificar token del usuario. 

imagen

4.- Actualizar información del usuario. 

imagen.
