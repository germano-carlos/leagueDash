var Axios = require('axios');

//Token deve ser renovado diariamente. A riot Obriga!
Axios.defaults.headers.common['X-Riot-Token'] = 'RGAPI-55ee387b-665b-4902-9e8c-beeb447e4847';

var urlDataDragon = "http://ddragon.leagueoflegends.com";
var urlDataRiot = "https://br1.api.riotgames.com";
var urlAmerica = "https://americas.api.riotgames.com";

var url = '';

module.exports = {
    async obterInformacoesCampeao(parametros) {
        url = urlDataDragon + `/cdn/10.16.1/data/en_US/champion/${parametros.nomeCampeao}.json`;
        Axios.get(url)
            .then((data) => { return (data.data.data) })
            .catch((err) => { console.log(err) });
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
    async obterPartidas(id) {
        url = urlDataRiot + `/lol/match/v4/matchlists/by-account/${id}`;
        
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
