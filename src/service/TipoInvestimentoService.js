const TipoInvestimentoModel = require('../models/TipoInvestimentoModel');
const InvestimentoModel = require('../models/InvestimentoModel');

const create = async (tipoInvestimento) => {
  const tipoInvestimentoCadastrados = await existsTipoInvestimento(
    tipoInvestimento,
  );
  if (tipoInvestimentoCadastrados && tipoInvestimentoCadastrados.length > 0) {
    return {
      status: 'erro',
      message: 'Já existe Tipo de investimento cadastrado com esse nome',
    };
  }
  const novoTipoInvestimento = await TipoInvestimentoModel.create(
    tipoInvestimento,
  );
  return { status: 'sucesso', novoTipoInvestimento };
};

const destroy = async (idTipoInvestimento) => {

  const verificaId = await existTipoInvestimento(idTipoInvestimento);
  if (!verificaId) {
    return {
      status: 'erro',
      message: 'Tipo de investimento inválido',
    };
  }

  const tiposInvestimentosIdCadastrados = await existsTipoInvestimentoFilho(
    idTipoInvestimento,
  );
  if (
    tiposInvestimentosIdCadastrados &&
    tiposInvestimentosIdCadastrados.length > 0
  ) {
    return {
      status: 'erro',
      message:
        'Existe investimentos cadastrados com esse tipo de investimentos',
    };
  }

  const destroyTipoInvestimento = await TipoInvestimentoModel.destroy(
    {where: {
      id:idTipoInvestimento
    }}
  );
  return { status: 'sucessso', destroyTipoInvestimento };
};

const existsTipoInvestimento = async (tipoInvestimento) => {
  const tiposInvestimentos = await TipoInvestimentoModel.findAll({
    raw: true,
    where: {
      nome: tipoInvestimento.nome,
      tipo_renda: tipoInvestimento.tipo_renda,
    },
  });

  return tiposInvestimentos;
};

const existsTipoInvestimentoFilho = async (idTipoInvestimento) => {
  const tiposInvestimentosId = await InvestimentoModel.findAll({
    raw: true,
    where: {
      id: idTipoInvestimento,
    },
  });
  return tiposInvestimentosId;
};

const existTipoInvestimento = async (idTipoInvestimento) => {
  const tInvestimentoId = await TipoInvestimentoModel.findByPk(
    idTipoInvestimento,
  ).then(
    (data) => {
    if (data) {
      return true;
    }
  });
  return tInvestimentoId;
};

module.exports = {
  create,
  destroy,
};
