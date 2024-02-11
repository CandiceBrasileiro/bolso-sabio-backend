const InvestimentoModel = require('../models/InvestimentoModel');
const AporteModel = require('../models/AportesModel');
const ProventoModel = require('../models/ProventoModel');

const create = async (investimento) => {
  const novoInvestimento = await InvestimentoModel.create(investimento);
  return { status: 'sucesso', novoInvestimento };
};

const destroy = async (idInvestimento) => {
  const verificaId = await existsInvestimentos(idInvestimento);

  if (!verificaId) {
    return {
      status: 'erro',
      message: 'Investimento inválido',
    };
  }

  const investimentosIdCadastradosAporte =
    await existsInvestimentosFilhoAportes(idInvestimento);

  if (
    investimentosIdCadastradosAporte &&
    investimentosIdCadastradosAporte.length > 0
  ) {
    return {
      status: 'erro',
      message: 'Existe ativos e/ou proventos cadastrados com esse investimento',
    };
  }

  const investimentosIdCadastradosProvento =
    await existsInvestimentosFilhoProventos(idInvestimento);

  if (
    investimentosIdCadastradosProvento &&
    investimentosIdCadastradosProvento.length > 0
  ) {
    return {
      status: 'erro',
      message: 'Existe ativos e/ou proventos cadastrados com esse investimento',
    };
  }

  const destroyInvestimento = await InvestimentoModel.destroy({
    where: {
      id: idInvestimento,
    },
  });
  return { status: 'sucessso', destroyInvestimento };
};

const existsInvestimentosFilhoAportes = async (idInvestimento) => {
  const investimentosId = await AporteModel.findAll({
    raw: true,
    where: {
      id_investimento: idInvestimento,
    },
  });
  return investimentosId;
};

const existsInvestimentosFilhoProventos = async (idInvestimento) => {
  const investimentosId = await ProventoModel.findAll({
    raw: true,
    where: {
      id_investimento: idInvestimento,
    },
  });
  return investimentosId;
};

const existsInvestimentos = async (idInvestimento) => {
  const investimentosId = await InvestimentoModel.findByPk(
    idInvestimento
    ).then(
    (data) => {
      if (data) {
        return true;
      }
    },
  );
  return investimentosId;
};

module.exports = {
  destroy,
  create,
};
