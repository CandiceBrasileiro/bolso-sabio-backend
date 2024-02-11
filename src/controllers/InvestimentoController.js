const InvestimentoModel = require('../models/InvestimentoModel');
const InvestimentoService = require('../service/InvestimentoService');

const getAllInvestimentos = async (req, res) => {
  InvestimentoModel.findAll({
    raw: true,
    order: [
      ['update_at', 'DESC'],
      ['id', 'DESC'],
    ],
  })
    .then((tipos) => {
      res.json(tipos);
      res.statusCode = 200;
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

const getInvestimentosByIdUsuario = async (req, res) => {

  let id_usuario = req.params.id_usuario;

  InvestimentoModel.findAll({
    where: {
      id_usuario
    }
  }).then((dados) => {
      res.status(200).json(dados);
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
}

const postInvestimento = async (req, res) => {
  console.log(req.body, '!!!!');
  const dataHj = new Date();
  const dataRegistro = dataHj.toISOString().split('T')[0];
  const valor_uni_ativo = req.body.valor_uni_ativo;
  const quantidade = req.body.quantidade;

  const investimento = {
    id_tipo_investimento: req.body.id_tipo_investimento,
    id_usuario: req.body.id_usuario,
    ativo: req.body.ativo,
    valor_uni_ativo,
    segmento: req.body.segmento,
    quantidade,
    valor_investido: (valor_uni_ativo * quantidade).toFixed(2),
    create_at: dataRegistro,
    update_at: dataRegistro,
  };

  let erroMsg = '';
  let statusCode = 500;

  try {
    const response = await InvestimentoService.create(investimento);
    if (response.status === 'erro') {
      erroMsg = response.message;
      statusCode = 409;
      return res.status(statusCode).json({ message: erroMsg });
    } else {
      return res.status(201).json(response.novoInvestimento);
    }
  } catch (e) {
    res.status(500).send({
      message: erroMsg,
    });
  }
};

const putInvestimento = async (req, res) => {
  let id = req.params.id;
  let idTipoInvestimento = req.body.id_tipo_investimento;
  let id_usuario = req.body.id_usuario;
  let ativo = req.body.ativo;
  let valorAtivo = req.body.valor_uni_ativo;
  let segmento = req.body.segmento;
  let quantidade = req.body.quantidade;
  let data = new Date();
  let date = data.toISOString().split('T')[0];

  InvestimentoModel.update(
    {
      id_tipo_investimento: idTipoInvestimento,
      id_usuario:id_usuario,
      ativo: ativo,
      valor_uni_ativo: valorAtivo,
      segmento: segmento,
      quantidade: quantidade,
      valor_investido: (valorAtivo * quantidade).toFixed(2),
      update_at: date,
    },
    {
      where: {
        id: id,
      },
    },
  )
    .then((dados) => {
      res.status(200).json(dados);
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

const deleteInvestimento = async (req, res) => {
  let id = req.params.id;
  let erroMsg = '';
  let statusCode = 500;

  try {
    const response = await InvestimentoService.destroy(id);
  
    if (response.status === 'erro') {
      erroMsg = response.message;
      statusCode = 409;
      return res.status(statusCode).json({ erroMsg });
    } else {
      return res.status(201).json(response.destroyInvestimento);
    }
  } catch (e) {

    res.status(500).send({
      message: erroMsg,
    });
  }
};

const getOneInvestimento = async (req, res) => {
  let id = req.params.id;

  InvestimentoModel.findByPk(id).then((data) => {
    if (data) {

      res.status(200).json(data);
    } else {
      res.status(500).send({ message: `Não foi localizado o id=${id}` });
    }
  });
};

module.exports = {
  getAllInvestimentos,
  postInvestimento,
  putInvestimento,
  deleteInvestimento,
  getOneInvestimento,
  getInvestimentosByIdUsuario
};
