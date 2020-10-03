const { Model, DataTypes } = require('sequelize');

class Partida extends Model {
    static init(sequelize) {
        super.init({
            id: {
                primaryKey: true,
                type: DataTypes.STRING
            },
            key: DataTypes.STRING,
            nome: DataTypes.STRING,
            title: DataTypes.STRING
        }, {
            timestamps: false,
            sequelize,
            freezeTableName: true,
        })
    }
}

module.exports = Partida;