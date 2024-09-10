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