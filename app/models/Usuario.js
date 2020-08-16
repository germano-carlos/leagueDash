const { Model, DataTypes } = require('sequelize');

class Usuario extends Model {
    static init(sequelize) {
        super.init({
            id: {
                primaryKey:true, 
                type: DataTypes.STRING
            },
            accountId: DataTypes.STRING,
            puuid: DataTypes.STRING,
            nome: DataTypes.STRING,
            iconeId: DataTypes.INTEGER,
            invocadorLevel: DataTypes.INTEGER,
            dataRevisao: DataTypes.INTEGER
        }, {
            timestamps: false,
            sequelize
        })
    }
}

module.exports = Usuario;