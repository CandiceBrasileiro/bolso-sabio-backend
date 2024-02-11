const UserModel = require('../models/UserModel');
const generator = require('generate-password');
const bcrypt = require('bcrypt');

const create = async (user) => {

  const emailCadastrado = await existEmail(user);

  if(emailCadastrado && emailCadastrado.length > 0) {
    return {
      status: 'erro',
      message: 'E-mail já cadastrado',
    }
  }
  const newUser = await UserModel.create(user);
  return {status: 'sucesso!', newUser}
}

const changePassword = async(user) => {

  const password = generator.generate({
    length: 8,
    lowercase: true,
    uppercase: true,
  })
  
  const id = user.id_usuario;
  const dataHj = new Date();
  const dataRegistro = dataHj.toISOString().split('T')[0];
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const passwordHash = bcrypt.hashSync(password, salt);
  
  const updatePassword = await UserModel.update(
    {
      senha: passwordHash,
      update_at: dataRegistro,
      ativo_senha_temporaria: 1
    },
    {
      where: {
        id_usuario: id
      }
    }
  );
  
  return {password};
}

const existEmail = async(user) => {
  console.log('exist', user.email)
  const emails = await UserModel.findAll({
    raw: true,
    where: {
      email: user.email,
    }
  });
  return emails
}

const getUserByEmail = async (email) => {

  const user = await UserModel.findOne({
      raw: true,
      where: {
          email
      }
  });
  return user;

}




module.exports = {
    create,
    getUserByEmail,
    changePassword

  };