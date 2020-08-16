const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Usuario = require('../app/models/Usuario.js');

const connection = new Sequelize(dbConfig);
Usuario.init(connection);

module.exports = {
    async store(jsonParams) {
    }
}