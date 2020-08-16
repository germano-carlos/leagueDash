const { Model, DataTypes } = require('sequelize');

class Usuario extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            riot_id: DataTypes.STRING
        }, {
            timestamps: false,
            sequelize
        })
    }
}

module.exports = Usuario;