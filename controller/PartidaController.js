const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const CampeaoController = require('../controller/CampeaoController');
/*const Partida = require('../app/models/Partida.js');*/

const Campeao = require('../app/models/Campeao');
const Api = require('../lib/Api');

const connection = new Sequelize(dbConfig);
Campeao.init(connection);

module.exports = {

    async store(jsonParams) {
        var PartidasDetalhes = [];

        let formatDate = new Date();
        let timeStamp = formatDate.setDate(formatDate.getDate() - 14);
        
        const Partidas = await Api.obterPartidas(jsonParams.account_id, timeStamp);
        let contador = 0;

        const promisse = new Promise(async (resolve, reject) => {
            await Partidas.forEach(async (element, index) => {
                if(index < 10)
                {
                    var Detalhes = await Api.obterPartidasById(element.gameId);
                    let lane = element.lane;
                    let gameMode = Detalhes.data.gameMode;
                    let gameType = Detalhes.data.gameType;
                    let gameId = Detalhes.data.gameId;

                    let championId = 0;
                    let win = 0;
                    let kills = 0;
                    let deaths = 0;
                    let assists = 0;
                    
                    let participantId = 0;
                    let achou = false;
                    let urlImage = "";

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

                        let champion = await Campeao.findOne({where: {key : championId}});
                        urlImage = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.nome.replace(" ","")}_0.jpg`;
                    }
    
                    PartidasDetalhes.push({lane, gameMode, gameType, championId, win, kills,deaths, assists, urlImage, gameId});
                    if(PartidasDetalhes.length == Partidas.length || contador == 9)
                    {
                        resolve(PartidasDetalhes)
                    }
                    contador++;
                }
            });
        })

        return await promisse.then((data) => {return data})
                             .catch((err) => {console.log('err')});

    },
    async getPartida(id) {
        const Partida = await Api.obterPartidasById(id);
        return Partida;
    },
    async Detalhes(id)
    {
        const Details = await this.getPartida(id);

        let playerArray = [];
        let contador = 0;
        
        const promisse = await new Promise (async (resolve, reject) => {
            await Details.data.participants.forEach(async (element, index) => {
                let participantId = element.participantId;
                let nome = "undefined";
                let tier = "undefined";
                let championId = element.championId;
                let kill = element.stats.kills;
                let deaths = element.stats.deaths;
                let assists = element.stats.assists;
                let win = element.stats.win;
                let goldEarned = element.stats.goldEarned;
                let goldSpent = element.stats.goldSpent;
                let champion = await CampeaoController.getChampionByKey(championId);
                let championName = champion.nome;
                let urlImage = `http://ddragon.leagueoflegends.com/cdn/10.20.1/img/champion/${championName.replace(" ","")}.png`;
        
                playerArray.push({participantId,nome, tier, championId, kill, deaths, assists, win, goldEarned, goldSpent, championName, urlImage});
                contador++;
                if(contador == Details.data.participants.length)
                {
                    resolve(playerArray);
                }
            });
        })

        for(k=0;k<playerArray.length;k++)
        {
            for(j=0;j<Details.data.participantIdentities.length;j++)
            {
                if(playerArray[k].participantId != Details.data.participantIdentities[j].participantId)
                { continue; }

                playerArray[k].nome = Details.data.participantIdentities[j].player.summonerName;
            }
        }

        return playerArray;
    }

}