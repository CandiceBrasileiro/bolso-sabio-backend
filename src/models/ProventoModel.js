const Sequelize = require('sequelize');
const connection = require('../database/database');
const Investimento = require('./InvestimentoModel');

const Provento = connection.define(
  'tb_proventos',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_investimento: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    provento: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    mes: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    ano: {
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
    data_controle: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    modelName: 'Provento',
    tableName: 'tb_proventos',
    createdAt: 'create_at',
    updatedAt: 'update_at',
    data_controle: 'data_controle',
    underscore: true,
  },
);

Provento.hasOne(Investimento, {
  foreignKey: 'id',
});

module.exports = Provento;
