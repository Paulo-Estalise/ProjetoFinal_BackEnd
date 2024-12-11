const express = require('express');
const CartRepository = require('../repositories/CartRepository');
const ProductRepository = require('../repositories/ProductRepository');
const TicketService = require('../services/TicketService');

const router = express.Router();

router.post('/:cid/purchase', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await CartRepository.getById(cid);

        if (!cart) return res.status(404).send({ error: 'Carrinho não encontrado' });

        const unavailableProducts = [];
        let totalAmount = 0;

        for (const item of cart.products) {
            const product = await ProductRepository.getById(item.product);

            if (product.stock >= item.quantity) {
                totalAmount += product.price * item.quantity;
                product.stock -= item.quantity;
                await ProductRepository.update(product._id, product);
            } else {
                unavailableProducts.push(item.product);
            }
        }

        const purchaser = req.user.email; //  o usuário está logado
        const ticket = await TicketService.createTicket(totalAmount, purchaser);

        cart.products = cart.products.filter((item) =>
            unavailableProducts.includes(item.product)
        );
        await CartRepository.update(cid, cart);

        res.send({
            status: 'success',
            ticket,
            unavailableProducts,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
