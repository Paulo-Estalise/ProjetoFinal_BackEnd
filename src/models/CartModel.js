const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
    products: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true },
        },
    ],
});

module.exports = mongoose.model('Cart', CartSchema);
