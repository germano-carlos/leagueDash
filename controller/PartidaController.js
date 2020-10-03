/*const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Partida = require('../app/models/Partida.js');*/
const Api = require('../lib/Api');

/*const connection = new Sequelize(dbConfig);
Partida.init(connection);*/

module.exports = {

    async store(jsonParams) {
        var PartidasDetalhes = [];

        let formatDate = new Date();
        let timeStamp = formatDate.setDate(formatDate.getDate() - 14);
        
        const Partidas = await Api.obterPartidas(jsonParams.account_id, timeStamp);
        console.log('achou'+ Partidas.length +'partidas')
        const promisse = new Promise(async (resolve, reject) => {
            await Partidas.forEach(async (element, index) => {
                if(index < 10)
                {
                    var Detalhes = await Api.obterPartidasById(element.gameId);
                    let lane = element.lane;
                    let gameMode = Detalhes.data.gameMode;
                    let gameType = Detalhes.data.gameType;
                    let championId = 0;
                    let win = 0;
                    let kills = 0;
                    let deaths = 0;
                    let assists = 0;
                    
                    let participantId = 0;
                    let achou = false;
                    for(i=0;i<Detalhes.data.participantIdentities.length && !achou; i++)
                    {
                        if(Detalhes.data.participantIdentities[i].player.currentAccountId != jsonParams.account_id)
                            continue;
                        
                        participantId = Detalhes.data.participantIdentities[i].participantId;
                        achou = true;
                    }
                    achou = false;
                    for(i=0;i<Detalhes.data.participants.length && !achou; i++)
                    {
                        if(Detalhes.data.participants[i].participantId != participantId)
                            continue;
                        
                        championId = Detalhes.data.participants[i].championId;
                        win = Detalhes.data.participants[i].stats.win;
                        kills = Detalhes.data.participants[i].stats.kills;
                        deaths = Detalhes.data.participants[i].stats.deaths;
                        assists = Detalhes.data.participants[i].stats.assists;
                        achou = true;
                    }
    
                    PartidasDetalhes.push({lane, gameMode, gameType, championId, win, kills,deaths, assists});
                    if(PartidasDetalhes.length == (Partidas.length))
                    {
                        resolve(PartidasDetalhes)
                    }
                        
                }
            });
        })

        return await promisse.then((data) => {return data})
                             .catch((err) => {console.log('err')});

    }

}