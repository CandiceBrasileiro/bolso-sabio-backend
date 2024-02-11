const TipoInvestimentoModel = require('../models/TipoInvestimentoModel');
const TipoInvestimentoService = require('../service/TipoInvestimentoService');

const getAllTiposInvestimentos = async (req, res) => {
  TipoInvestimentoModel.findAll({
    raw: true,
    order: [
      ['create_at', 'DESC'],
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

const postTipoInvestimento = async (req, res) => {
  const dataHj = new Date();
  const dataRegistro = dataHj.toISOString().split('T')[0];

  const tipoInvestimento = {
    nome: req.body.nome,
    tipo_renda: req.body.tipo_renda,
    create_at: dataRegistro,
    update_at: dataRegistro,
  };

  let erroMsg = '';
  let statusCode = 500;

  try {
    const response = await TipoInvestimentoService.create(tipoInvestimento);
    if (response.status === 'erro') {
      erroMsg = response.message;
      statusCode = 409;
      return res.status(statusCode).json({ message: erroMsg });
    } else {
      return res.status(201).json(response.novoTipoInvestimento);
    }
  } catch (e) {
    res.status(500).send({
      message: erroMsg,
    });
  }
};

const putTipoInvestimento = async (req, res) => {
  let id = req.params.id;
  let nome = req.body.nome;
  let tipoRenda = req.body.tipo_renda;
  let data = new Date();
  let date = data.toISOString().split('T')[0];

  TipoInvestimentoModel.update(
    {
      nome: nome,
      tipo_renda: tipoRenda,
      update_at: date,
    },
    {
      where: {
        id: id,
      },
    },
  )
    .then((dados) => {
      res.statusCode = 200;
      res.json(dados);
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

const deleteTipoInvestimento = async (req, res) => {
  let id = req.params.id;
  let erroMsg = '';
  let statusCode = 500;

  try {
    const response = await TipoInvestimentoService.destroy(id);

    if (response.status === 'erro') {
      erroMsg = response.message;
      statusCode = 409;
      return res.status(statusCode).json({ erroMsg });
    } else {
      return res.status(201).json(response.destroyTipoInvestimento);
    }
  } catch (e) {

    res.status(500).send({
      message: erroMsg,
    });
  }
};

const getOneTipoInvestimento = async (req, res) => {
  let id = req.params.id;

  TipoInvestimentoModel.findByPk(id).then((data) => {
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(500).send({ message: `Não foi localizado o id=${id}` });
    }
  });
};

module.exports = {
  getAllTiposInvestimentos,
  postTipoInvestimento,
  putTipoInvestimento,
  deleteTipoInvestimento,
  getOneTipoInvestimento,
};
