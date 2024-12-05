const CartModel = require('../../models/CartModel');

class CartDAOMongo {
    async getById(id) {
        return await CartModel.findById(id).populate('products.product');
    }

    async update(id, cart) {
        return await CartModel.findByIdAndUpdate(id, cart, { new: true });
    }
}

module.exports = CartDAOMongo;
