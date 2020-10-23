const { Model, DataTypes } = require('sequelize');

class Campeao extends Model {
    static init(sequelize) {
        super.init({
            id: {
                primaryKey: true,
                type: DataTypes.STRING
            },
            key: DataTypes.STRING,
            nome: DataTypes.STRING,
            title: DataTypes.STRING,
            blurb: DataTypes.STRING
        }, {
            timestamps: false,
            sequelize,
            freezeTableName: true,
        })
    }
}

module.exports = Campeao;