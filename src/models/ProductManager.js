const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
    }

    async addProduct(product) {
        // Lógica para adicionar produto
    }

    async getProducts() {
        // Lógica para obter produtos
    }

    async getProductById(id) {
        // Lógica para obter produto por ID
    }

    async updateProduct(id, updatedProduct) {
        // Lógica para atualizar produto
    }

    async deleteProduct(id) {
        // Lógica para deletar produto
    }
}

module.exports = ProductManager; // Exportando corretamente
