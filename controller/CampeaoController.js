const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Campeao = require('../app/models/Campeao');
const Api = require('../lib/Api');

const connection = new Sequelize(dbConfig);
Campeao.init(connection);

module.exports = {

    async store() {

        const campeaoList = await Api.obterCampeoesRiot();
        let next = true;
        let contador = 0;
        let array = [];

        while (next) {
            array.push({
                id: Object.values(campeaoList.data)[contador].id,
                key: Object.values(campeaoList.data)[contador].key,
                nome: Object.values(campeaoList.data)[contador].name,
                title: Object.values(campeaoList.data)[contador].title,
                blurb: Object.values(campeaoList.data)[contador].blurb
            });

            await Campeao.create(array[array.length-1]);
            next = Object.keys(campeaoList.data)[contador + 1] != null ? true : false;
            contador++;
        }


        return array
    },
    async getChampionByKey(id)
    {
        return await Campeao.findOne({where : {key: id}});
    },
    async getChampionById(id)
    {
        return await Campeao.findByPk(id);
    },
    async getAll() {
        const campeaoList = await Campeao.findAll();

        return campeaoList;
    },
    async getRiotById(id) {
        return await Api.obterInformacoesCampeao({nomeCampeao: id});
    }
}