const express = require('express');
const router = express.Router();
const ProductManager = require('../models/ProductManager'); 
const manager = new ProductManager('./data/products.json');

// Rota para exibir os produtos
router.get('/products', async (req, res) => {
    const { limit = 10, page = 1, sort, query } = req.query;
    const options = { limit, page, sort, query };
    const result = await manager.getPaginatedProducts(options);

    res.render('products', {
        status: 'success',
        products: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage ? `/products?limit=${limit}&page=${result.prevPage}` : null,
        nextLink: result.hasNextPage ? `/products?limit=${limit}&page=${result.nextPage}` : null,
    });
});

module.exports = router;
