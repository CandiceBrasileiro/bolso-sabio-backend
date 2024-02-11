const ProventoModel = require('../models/ProventoModel');

const create = async (provento) => {
  const proventosCadastrados = await existsProvento(provento);
  
  if (proventosCadastrados && proventosCadastrados.length > 0) {
    return {
      status: 'erro',
      message:
        'Já existe provento cadastrado nesse período para o investimento',
    };
  }

  const verificaData = await verficarDataPostada(provento);

  if (verificaData == false)
    return {
      status: 'erro',
      message: 'Você não pode cadastrar proventos de tempo futuro',
    };
  const novoProvento = await ProventoModel.create(provento);
  console.log('provenoData', novoProvento)
  return { status: 'sucesso', novoProvento, verificaData };
};

const verficarDataPostada = async (provento) => {
  const today = new Date();
  const monthCurrent = today.getUTCMonth() + 1;
  const yearCurrent = today.getUTCFullYear();
  const monthEntry = parseInt(provento.mes);
  const yearEntry = parseInt(provento.ano);

  if (yearCurrent === yearEntry && monthCurrent >= monthEntry) {
    return true;
  } else if (yearCurrent > yearEntry) {
    return true;
  } else {
    return false;
  }
};

const existsProvento = async (provento) => {
  const proventos = await ProventoModel.findAll({
    raw: true,
    where: {
      mes: provento.mes,
      ano: provento.ano,
      id_investimento: provento.id_investimento,
    },
  });
  return proventos;
};

module.exports = {
  create,
};
