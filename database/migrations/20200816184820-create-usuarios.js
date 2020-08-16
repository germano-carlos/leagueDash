'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Usuarios', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      account_id: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      puuid: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      nome: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      icone_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      invocador_level: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      data_criacao: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      data_revisao: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
