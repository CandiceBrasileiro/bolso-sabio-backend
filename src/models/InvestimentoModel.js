const Sequelize = require('sequelize');
const connection = require('../database/database');
const TipoInvestimento = require('./TipoInvestimentoModel');
const User = require('./UserModel');

const Investimento = connection.define(
  'tb_investimentos',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: {
      type:Sequelize.INTEGER,
      allowNull: false,
    },
    id_tipo_investimento: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    ativo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    valor_uni_ativo: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    segmento: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    quantidade: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    valor_investido: {
      type: Sequelize.FLOAT,
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
    modelName: 'Investimento',
    tableName: 'tb_investimentos',
    createdAt: 'create_at',
    updatedAt: 'update_at',
    underscore: true,
  },
);

Investimento.hasOne(TipoInvestimento, {
  foreignKey: 'id',
});

Investimento.hasOne(User, {
  foreignKey: 'id_usuario',
})

module.exports = Investimento;
