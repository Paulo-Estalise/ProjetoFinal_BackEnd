require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const { PORT, MONGO_URI } = require("./src/config/config");
const productsRouter = require('./src/routes/productsRouter');
const cartsRouter = require('./src/routes/cartsRouter');

const app = express();

app.use(express.json());

// Rotas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const startServer = async () => {
    try {
        // Conexão com o MongoDB
        await mongoose.connect(MONGO_URI);
        console.log('Conectado ao MongoDB');

        // Iniciando o servidor
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB:', err.message);
        process.exit(1); // Saída do processo em caso de erro
    }
};

startServer();
