const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Forum = require('../app/models/Forum');
const Api = require('../lib/Api');
const UsuarioController = require('./UsuarioController');

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
    },
    async getAll() { 
        let Foruns = await Forum.findAll();  
        let objects = [];

        for( i = 0; i < Foruns.length;i++)
        {
            let usuario = await UsuarioController.getUser(Foruns[i].usuario_id);
            
            let object = {
                id: Foruns[i].id,
                title : Foruns[i].title,
                conteudo : Foruns[i].conteudo,
                categoria : Foruns[i].categoria,
                data_criacao : Foruns[i].data_criacao,
                data_ult_atualizacao : Foruns[i].data_ult_atualizacao,
                iconId : usuario.icone_id,
                usuarioNome : usuario.nome
            };
            objects.push(object);
        }
        
        return objects;
    },
    async getId(id) { return await Forum.findByPk(id); }
}