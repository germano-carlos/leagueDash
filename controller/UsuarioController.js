const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Usuario = require('../app/models/Usuario.js');
const Api = require('../lib/Api');

const connection = new Sequelize(dbConfig);
Usuario.init(connection);

module.exports = {

    async store(jsonParams, forum = false) {

        const invocador = await Api.obterInvocador(jsonParams)
            .then((data) => { return data })
            .catch((err) => { return null });

        if (invocador)
            var findUser = await Usuario.findOne({ where: { id_riot: invocador.id } });
        else
            return null;

        if (invocador && !findUser) {
            const user = await Usuario.create({
                id_riot: invocador.id,
                account_id: invocador.accountId,
                puuid: invocador.puuid,
                nome: invocador.name,
                icone_id: invocador.profileIconId,
                invocador_level: invocador.summonerLevel,
                forum: (forum) ? 'S' : 'N'
            });
            return user;
        }

        return findUser;
    },
    async getUser(id) {

        var findUser = await Usuario.findByPk(id);

        if (findUser)
            return findUser;

        return null;
    },
    async getUserByParametros(id) {
        if (typeof id == 'undefined' || id == null) return;
        const userLocal = await this.getUser(id);

        if (!userLocal) return;
        return await Api.obterInvocadorByEncriptedSummonnerId(userLocal.id_riot);
    },
    async getUserDetails(encriptedSummonnerId) {
        return Api.obterEloInvocador(encriptedSummonnerId);
    },
    async getLiga(user) {
        let liga = await Api.obterLeagueIdByEncriptedSummonnerId(user.id);
        let detailsLiga;
        if (liga[0].leagueId != null) detailsLiga = await Api.obterInvocadoresByLeagueId(liga[0].leagueId);
        else detailsLiga = null;

        const fullLeague = {
            leagueName: detailsLiga.name,
            leagueId: liga[0].leagueId ? liga[0].leagueId : null,
            mainSummonner: liga[0].summonerName ? liga[0].summonerName : null,
            mainRank: (liga[0].tier) ? liga[0].tier : null,
            participants: detailsLiga.entries.sort(ordernarPDL).reverse()
        };

        function ordernarPDL(a, b) {
            return a.leaguePoints - b.leaguePoints;
        }

        return fullLeague;
    },
    async getUserBySummonerName(summonerName) { return await Usuario.findOne({ where: { nome: summonerName } }); },
    async addForum(form) {
        let output;
        let User = await Usuario.findOne({ where: { nome: form.userName } });

        if (!User) { User = await this.store({ nomeInvocador: form.userName }, true ); }
        if (!User) { return false; }

        if(User.password == null) {
            await Usuario.update(
                { forum: 'S', password: form.userPassword },
                { where: { id: User.id } }
            ).then(result => { output = User })
            .catch((err) => {output = false})
        }
        else {
            return false;
        }

        return output;
    }

}