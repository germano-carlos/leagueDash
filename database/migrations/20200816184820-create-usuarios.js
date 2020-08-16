'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Usuario', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      riotId: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      nome: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      data_criacao: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      ultima_atualizacao: {
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
