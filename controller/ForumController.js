const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Forum = require('../app/models/Forum');
const Api = require('../lib/Api');

const connection = new Sequelize(dbConfig);
Forum.init(connection);

module.exports = {
    async store(object) {
        const title = object.title;
        const categoria = object.categoria;
        const userId = object.id;
        const conteudo = object.conteudo;

        const topico = await Forum.create({
            title,
            conteudo,
            categoria,
            usuario_id: userId,
            data_criacao: new Date(),
            data_ult_atualizacao: new Date(),
            ativo_web: 'S'
        }).then((sucess) => { return true; })
            .catch((err) => { return false; });

        return topico;
    }
}