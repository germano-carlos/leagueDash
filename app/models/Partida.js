const { Model, DataTypes } = require('sequelize');
//lane, gameMode, gameType, championId, win, kills, deaths, assists, urlImage, gameId
class Partida extends Model {
    static init(sequelize) {
        super.init({
            id: {
                primaryKey: true,
                type: DataTypes.STRING
            },
            lane: DataTypes.STRING,
            game_mode: DataTypes.STRING,
            game_type: DataTypes.STRING,
            champion_id: DataTypes.INTEGER,
            win: DataTypes.ENUM({values: ['S', 'N']}),
            kills: DataTypes.INTEGER,
            deaths: DataTypes.INTEGER,
            assists: DataTypes.INTEGER,
            game_id: DataTypes.STRING,
            usuario_id: DataTypes.INTEGER,
            data_criacao: DataTypes.DATE
        }, {
            timestamps: false,
            sequelize,
            freezeTableName: true,
        })
    }
}

module.exports = Partida;