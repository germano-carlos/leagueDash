const { Model, DataTypes } = require('sequelize');

class Mensagem extends Model {
    static init(sequelize) {
        super.init({
            id: {
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            conteudo: DataTypes.TEXT,
            usuario_id: DataTypes.INTEGER,
            topico_id: DataTypes.INTEGER,
            data_criacao: DataTypes.DATE,
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

module.exports = Mensagem;