const ProventoModel = require('../models/ProventoModel');
const ProventoService = require('../service/ProventoService');
const { Op } = require('sequelize');

const getAllProventos = async (req, res) => {
  ProventoModel.findAll({
    raw: true,
    order: [
      ['ano', 'DESC'],
      ['mes', 'DESC'],
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

const postProvento = async (req, res) => {
  const dataHj = new Date();
  const dataRegistro = dataHj.toISOString().split('T')[0];
  const mes = req.body.mes;
  const ano = req.body.ano;
  const dadosData = ano + '-' + mes + '-' + 1;
  const dataControle = Date.parse(dadosData);

  const provento = {
    id_investimento: req.body.id_investimento,
    provento: req.body.provento,
    mes: mes,
    ano: ano,
    create_at: dataRegistro,
    update_at: dataRegistro,
    data_controle: dataControle,
  };

  let erroMsg = '';
  let statusCode = 500;

  try {
    const response = await ProventoService.create(provento);
    if (response.status === 'erro') {
      erroMsg = response.message;
      statusCode = 409;
      return res.status(statusCode).json({ message: erroMsg });
    } else {
      return res.status(201).json(response.novoProvento);
    }
  } catch (e) {
    res.status(500).send({
      message: erroMsg,
    });
  }
};

const putProvento = async (req, res) => {
  let id = req.params.id;
  let idInvestimento = req.body.id_investimento;
  let provento = req.body.provento;
  let mes = req.body.mes;
  let ano = req.body.ano;
  let data = new Date();
  let date = data.toISOString().split('T')[0];
  const dadosData = ano + '-' + mes + '-' + 1;
  const dataControle = Date.parse(dadosData);

  ProventoModel.update(
    {
      id_investimento: idInvestimento,
      provento: provento,
      mes: mes,
      ano: ano,
      update_at: date,
      data_controle: dataControle,
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

const deleteProvento = async (req, res) => {
  let id = req.params.id;

  ProventoModel.findByPk(id).then((data) => {
    if (data) {
      ProventoModel.destroy({
        where: {
          id: id,
        },
      }).then(() => {
        res
          .status(200)
          .send({ message: `O id=${id} foi excluído com sucesso` });
      });
    } else {
      res.status(500).send({ message: `Não foi localizado o id=${id}` });
    }
  });
};

const getOneProvento = async (req, res) => {
  let id = req.params.id;

  ProventoModel.findByPk(id).then((data) => {
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(500).send({ message: `Não foi localizado o id=${id}` });
    }
  });
};

const getProventosByInvestimentos = async (req, res) => {
  const id = req.params.id_investimento;
  ProventoModel.findAll({
    raw: true,
    where: {
      id_investimento: id,
    },
    order: [
      ['ano', 'DESC'],
      ['mes', 'DESC'],
    ],
  })
    .then((proventos) => {
      res.json(proventos);
      res.statusCode = 200;
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

const getPeriodoProvento = async (req, res) => {
  const today = new Date();
  const monthCurrent = today.getUTCMonth() + 1;
  const yearCurrent = today.getUTCFullYear() - 1;
  const dadosBar = yearCurrent + '-' + monthCurrent + '-' + 1;
  const dados = Date.parse(dadosBar);

  ProventoModel.findAll({
    raw: true,
    where: {
      data_controle: {
        [Op.gte]: dados,
      },
    },
  })
    .then((dados) => {
      res.json(dados);
      res.statusCode = 200;
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

module.exports = {
  getAllProventos,
  postProvento,
  putProvento,
  deleteProvento,
  getOneProvento,
  getProventosByInvestimentos,
  getPeriodoProvento,
};
