const Sequelize = require('sequelize');
const connection = require('../database/database');

const User = connection.define(
    'tb_usuarios',
    {
        id_usuario: 
        {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        nm_usuario: 
        {
            type: Sequelize.STRING,
            allowNull:false,
        },
        cpf:
        {
            type: Sequelize.STRING,
            allowNull:false,  
        },
        email: 
        {
            type: Sequelize.STRING,
            allowNull:false,
            unique: true
        },
        senha: 
        {
            type: Sequelize.STRING,
            allowNull:false,
        },
        ativo: 
        {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        create_at: 
        {
            type: Sequelize.DATE,
            allowNull: false,
        },
        update_at: 
        {
            type: Sequelize.DATE,
            allowNull: false,
        },
        ativo_senha_temporaria: 
        {
            type: Sequelize.INTEGER
        }
    },
    {
        modelName: 'User',
        tableName: 'tb_usuarios',
        createdAt: 'create_at',
        updatedAt: 'update_at',
        underscore: true,
      },
);

module.exports = User;