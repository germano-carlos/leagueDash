var Axios = require('axios');

//Token deve ser renovado diariamente. A riot Obriga!
Axios.defaults.headers.common['X-Riot-Token'] = 'RGAPI-ff688d30-0cb2-4918-9f48-a1aa0aeeb466';

var urlDataDragon = "http://ddragon.leagueoflegends.com";
var urlDataRiot = "https://br1.api.riotgames.com";
var urlAmerica = "https://americas.api.riotgames.com";

var url = '';

module.exports = {
    async obterInformacoesCampeao(parametros) {
        url = urlDataDragon + `/cdn/10.16.1/data/pt_BR/champion/${parametros.nomeCampeao}.json`;
        const promise = new Promise(async (resolve, reject) => { 
            await Axios.get(url)
                .then((data) => { resolve(data.data.data)})
                .catch((err) => { reject(err); });
            })

        return promise;
    },
    async obterInvocador(parametros) {
        url = urlDataRiot + `/lol/summoner/v4/summoners/by-name/${parametros.nomeInvocador}`;
        
        const promise = new Promise(async (resolve, reject) => {
            await Axios.get(url)
                .then((response) => { resolve(response.data); })
                .catch((err) => { reject(err); });
        })

        return promise;
    },
    async obterCampeoesRiot() {
        url = urlDataDragon + `/cdn/10.16.1/data/pt_BR/champion.json`;

        const promise = new Promise(async (resolve, reject) => {
            await Axios.get(url)
                .then((response) => { resolve(response.data); })
                .catch((err) => { reject(err) });
        })

        return promise;
    },
    async obterPartidas(id, timeStamp) {
        
        url = urlDataRiot + `/lol/match/v4/matchlists/by-account/${id}/?beginTime=${timeStamp}`;
        
        const promise = new Promise(async (resolve, reject) => {
            await Axios.get(url)
                .then((response) => { resolve(response.data.matches); })
                .catch((err) => { reject(err); });
        })

        return promise;
    },
    async obterPartidasById(id) {
        url = urlDataRiot + `/lol/match/v4/matches/${id}`;
        
         const promise = new Promise(async (resolve, reject) => {
            await Axios.get(url)
                        .then((response) => { resolve(response); })
                        .catch((err) => { reject(err); });
        })

        return promise;
    }

}

// Busca as Informações por Champion Name 
// http://ddragon.leagueoflegends.com/cdn/10.16.1/data/pt_BR/champion/Aphelios.json

// Busca a Imagem de carregamento do Champion
// http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_0.jpg

// Busca a Imagem quadrada do rosto do personagem
// http://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/Aatrox.png

// Busca a Imagem da passiva do Champion
// http://ddragon.leagueoflegends.com/cdn/10.16.1/img/passive/Anivia_P.png
