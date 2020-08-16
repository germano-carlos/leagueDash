const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Usuario = require('../app/models/Usuario.js');
const Api = require('../lib/Api');

const connection = new Sequelize(dbConfig);
Usuario.init(connection);

module.exports = {
    async store(jsonParams) {
        Api.obterInformacoesCampeao(jsonParams);
    },
    async getData() {
        Api.obterInvocador({nomeInvocador: 'Famys'});
    }
}