const express = require(`express`); 
const router = express.Router();

const userRouter = require(`./userRoutes`); 
const authRouter = require(`./authRoutes`);
const productRouter = require(`./productRoutes`);


router.use(`/users`, userRouter); 
router.use(`/`, authRouter); 
router.use(`/products`, productRouter);



module.exports = router;