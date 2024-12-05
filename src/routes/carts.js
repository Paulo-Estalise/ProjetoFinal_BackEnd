const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const CARTS_FILE = path.join(__dirname, '../data/carts.json');

// Funções auxiliares
const readCarts = () => JSON.parse(fs.readFileSync(CARTS_FILE, 'utf-8'));
const writeCarts = (carts) => fs.writeFileSync(CARTS_FILE, JSON.stringify(carts, null, 2));

// Criar novo carrinho
router.post('/', (req, res) => {
    const carts = readCarts();
    const newCart = { id: `${Date.now()}`, products: [] };
    carts.push(newCart);
    writeCarts(carts);

    res.status(201).json(newCart);
});

// Obter carrinho por ID
router.get('/:cid', (req, res) => {
    const { cid } = req.params;
    const carts = readCarts();
    const cart = carts.find(c => c.id === cid);
    if (!cart) return res.status(404).json({ error: 'Carrinho não encontrado' });
    res.json(cart.products);
});

// Adicionar produto ao carrinho
router.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    const carts = readCarts();

    const cart = carts.find(c => c.id === cid);
    if (!cart) return res.status(404).json({ error: 'Carrinho não encontrado' });

    const productIndex = cart.products.findIndex(p => p.product === pid);
    if (productIndex !== -1) {
        cart.products[productIndex].quantity += 1;
    } else {
        cart.products.push({ product: pid, quantity: 1 });
    }
    writeCarts(carts);

    res.json(cart);
});

module.exports = router;
