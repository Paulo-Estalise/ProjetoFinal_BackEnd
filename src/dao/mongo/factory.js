const { MONGO_URI, PORT } = require('../../config/config'); // Ajuste o caminho se necessário

console.log('Configurações carregadas:', { MONGO_URI, PORT });

module.exports = {
    mongoUri: MONGO_URI,
    port: PORT,
};
