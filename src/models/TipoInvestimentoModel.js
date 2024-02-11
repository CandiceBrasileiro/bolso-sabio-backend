const Sequelize = require('sequelize');
const connection = require('../database/database');

const TipoInvestimento = connection.define(
  'tb_tipos_investimentos',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    tipo_renda: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    create_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    update_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    modelName: 'TipoInvestimento',
    tableName: 'tb_tipos_investimentos',
    createdAt: 'create_at',
    updatedAt: 'update_at',
    underscore: true,
  },
);

module.exports = TipoInvestimento;
