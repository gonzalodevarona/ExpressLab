import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    ownerId: {
        type: String,
        required: true
    }
})

const Product = mongoose.model('Product', productSchema)

export default Product;

