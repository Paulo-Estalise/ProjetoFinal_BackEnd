const express = require('express');
const router = express.Router();
const ProductRepository = require('../repositories/ProductRepository');
const factory = require('../dao/mongo/factory');

const productRepository = new ProductRepository(factory.ProductDAO);

router.get('/', async (req, res) => {
    const products = await productRepository.getAll();
    res.send(products);
});

router.post('/', async (req, res) => {
    const newProduct = await productRepository.create(req.body);
    res.status(201).send(newProduct);
});

module.exports = router;
