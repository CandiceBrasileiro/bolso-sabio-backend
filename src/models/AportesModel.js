const Sequelize = require('sequelize');
const connection = require('../database/database');
const Investimento = require('./InvestimentoModel');

const Aporte = connection.define(
  'tb_aportes',
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
    valor_aportado: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    valor_ativo: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    quantidade: {
      type: Sequelize.INTEGER,
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
  },
  {
    modelName: 'Aporte',
    tableName: 'tb_aportes',
    createdAt: 'create_at',
    updatedAt: 'update_at',
    underscore: true,
  },
);

Aporte.hasOne(Investimento, {
  foreignKey: 'id',
});

module.exports = Aporte;
