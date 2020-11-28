const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Mensagem = require('../app/models/Mensagem');
const Api = require('../lib/Api');
const UsuarioController = require('./UsuarioController');

const connection = new Sequelize(dbConfig);
Mensagem.init(connection);

module.exports = {

    async store(object) {
        return await Mensagem.create({
            conteudo : object.mensagem,
            topico_id : object.topicoId,
            usuario_id: object.id,
            data_criacao: new Date(),
            ativo_web: 'S'
        });

    },
    async getAllByTopicId(topicId) {
        const ListMessages = await Mensagem.findAll({where: {topico_id: topicId}});
        let objects = [];

        for(let i=0; i<ListMessages.length;i++)
        {
            let usuario = await UsuarioController.getUser(ListMessages[i].usuario_id);
            let object = {
                id: ListMessages[i].id,
                conteudo : ListMessages[i].conteudo,
                data_criacao : ListMessages[i].data_criacao,
                ativo_web : ListMessages[i].ativo_web,
                usuarioNome : usuario.nome
            };

            objects.push(object);
        }
        console.log(objects)
        return objects;
    }

}