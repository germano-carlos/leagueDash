const { Model, DataTypes } = require('sequelize');

class Forum extends Model {
    static init(sequelize) {
        super.init({
            id: {
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            title: DataTypes.STRING,
            conteudo: DataTypes.TEXT,
            usuario_id: DataTypes.INTEGER,
            categoria: DataTypes.STRING,
            data_criacao: DataTypes.DATE,
            data_ult_atualizacao: DataTypes.DATE,
            ativo_web: DataTypes.ENUM({
                values: ['S', 'N']
            })
        }, {
            timestamps: false,
            sequelize,
            freezeTableName: true,
        })
    }
}

module.exports = Forum;