const { Model, DataTypes } = require('sequelize');

class Usuario extends Model {
    static init(sequelize) {
        super.init({
            id_riot: DataTypes.STRING,
            account_id: DataTypes.STRING,
            puuid: DataTypes.STRING,
            nome: DataTypes.STRING,
            icone_id: DataTypes.INTEGER,
            invocador_level: DataTypes.INTEGER,
            password: DataTypes.STRING,
            forum: DataTypes.ENUM({
                values: ['S', 'N']
              })
        }, {
            timestamps: false,
            sequelize
        })
    }
}

module.exports = Usuario;