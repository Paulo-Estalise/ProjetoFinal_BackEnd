const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const PRODUCTS_FILE = path.join(__dirname, '../data/products.json');

// Funções auxiliares
const readProducts = () => JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'));
const writeProducts = (products) => fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));

// Listar produtos
router.get('/', (req, res) => {
    const { limit } = req.query;
    const products = readProducts();
    if (limit) return res.json(products.slice(0, parseInt(limit)));
    res.json(products);
});

// Obter produto por ID
router.get('/:pid', (req, res) => {
    const { pid } = req.params;
    const products = readProducts();
    const product = products.find(p => p.id === pid);
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json(product);
});

// Criar novo produto
router.post('/', (req, res) => {
    const { title, description, code, price, stock, category, thumbnails, status } = req.body;
    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios, exceto thumbnails' });
    }

    const products = readProducts();
    const newProduct = {
        id: `${Date.now()}`,
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails: thumbnails || [],
        status: status !== undefined ? status : true,
    };
    products.push(newProduct);
    writeProducts(products);

    res.status(201).json(newProduct);
});

// Atualizar produto
router.put('/:pid', (req, res) => {
    const { pid } = req.params;
    const updates = req.body;

    const products = readProducts();
    const productIndex = products.findIndex(p => p.id === pid);
    if (productIndex === -1) return res.status(404).json({ error: 'Produto não encontrado' });

    const updatedProduct = { ...products[productIndex], ...updates, id: products[productIndex].id };
    products[productIndex] = updatedProduct;
    writeProducts(products);

    res.json(updatedProduct);
});

// Deletar produto
router.delete('/:pid', (req, res) => {
    const { pid } = req.params;
    const products = readProducts();
    const updatedProducts = products.filter(p => p.id !== pid);
    if (updatedProducts.length === products.length) {
        return res.status(404).json({ error: 'Produto não encontrado' });
    }
    writeProducts(updatedProducts);

    res.status(204).end();
});

module.exports = router;
