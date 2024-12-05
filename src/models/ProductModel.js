const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    code: { type: String, unique: true, required: true },
});

module.exports = mongoose.model('Product', ProductSchema);
