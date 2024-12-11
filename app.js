require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const { PORT, MONGO_URI } = require("./src/config/config");
const productsRouter = require('./src/routes/productsRouter');
const cartsRouter = require('./src/routes/cartsRouter');
const viewsRouter = require('./src/routes/ViewRoute')


const app = express();

app.use(express.json());

// Rotas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const startServer = async () => {
    try {
        
        await mongoose.connect(MONGO_URI);
        console.log('Conectado ao MongoDB');

       
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB:', err.message);
        process.exit(1); 
    }
};

startServer();
