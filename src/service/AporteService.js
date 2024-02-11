const AporteModel = require('../models/AportesModel');

const create = async (aporte) => {
  const verificaData = await verficarDataPostada(aporte);

  if (verificaData == false)
    return {
      status: 'erro',
      message: 'Você não pode cadastrar aportes de tempo futuro',
    };
  const novoAporte = await AporteModel.create(aporte);
  console.log(novoAporte, 'novoAporte')

  return { status: 'sucesso', novoAporte, verificaData };
};

const verficarDataPostada = async (aporte) => {
  const today = new Date();
  const monthCurrent = today.getUTCMonth() + 1;
  const yearCurrent = today.getUTCFullYear();
  const monthEntry = parseInt(aporte.mes);
  const yearEntry = parseInt(aporte.ano);

  if (yearCurrent === yearEntry && monthCurrent >= monthEntry) {

    return true;
  } else if (yearCurrent > yearEntry) {

    return true;
  } else {
  
    return false;
  }
};

module.exports = {
  create,
};
