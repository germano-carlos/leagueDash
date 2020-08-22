const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Usuario = require('../app/models/Usuario.js');
const Api = require('../lib/Api');

const connection = new Sequelize(dbConfig);
Usuario.init(connection);

module.exports = {

    async store(jsonParams) {

        const invocador = await Api.obterInvocador(jsonParams);
        const findUser = await Usuario.findByPk(invocador.id);
        
        if (invocador && !findUser)
        {
            const user = await Usuario.create({
                            id: invocador.id,
                            account_id: invocador.accountId,
                            puuid: invocador.puuid,
                            nome: invocador.name,
                            icone_id: invocador.profileIconId,
                            invocador_level: invocador.summonerLevel
                        });
            return user;
        }

        return findUser;
    }
}