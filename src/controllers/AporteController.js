
const AporteModel = require('../models/AportesModel');
const AporteService = require('../service/AporteService');

const getAllAportes = async (req, res) => {
  AporteModel.findAll({
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

const postAporte = async (req, res) => {
  const dataHj = new Date();
  const dataRegistro = dataHj.toISOString().split('T')[0];
  let idInvestimento = req.body.id_investimento;
  let valorAportado = req.body.valor_aportado;
  let quantidade = req.body.quantidade;
  let mes = req.body.mes;
  let ano = req.body.ano;

  const aporte = {
    id_investimento: idInvestimento,
    valor_aportado: valorAportado,
    valor_ativo: (valorAportado * quantidade).toFixed(2),
    quantidade: quantidade,
    mes: mes,
    ano: ano,
    create_at: dataRegistro,
    update_at: dataRegistro,
  };

  let erroMsg = '';
  let statusCode = 500;

  try {
    const response = await AporteService.create(aporte);
    if (response.status === 'erro') {
      erroMsg = response.message;
      statusCode = 409;
      return res.status(statusCode).json({ message: erroMsg });
    } else {
      return res.status(201).json(response.novoAporte);
    }
  } catch (e) {
    res.status(500).send({
      message: erroMsg,
    });
  }
};

const putAporte = async (req, res) => {
  let id = req.params.id;
  let idInvestimento = req.body.id_investimento;
  let valorAportado = req.body.valor_aportado;
  let valorAtivo = req.body.valor_ativo;
  let quantidade = req.body.quantidade;
  let mes = req.body.mes;
  let ano = req.body.ano;
  let data = new Date();
  let date = data.toISOString().split('T')[0];

  AporteModel.update(
    {
      id_investimento: idInvestimento,
      valor_aportado: valorAportado,
      valor_ativo: (valorAportado * quantidade).toFixed(2),
      quantidade: quantidade,
      mes: mes,
      ano: ano,
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

const deleteAporte = async (req, res) => {
  let id = req.params.id;

  AporteModel.findByPk(id).then((data) => {
    if (data) {
      AporteModel.destroy({
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

const getOneAporte = async (req, res) => {
  let id = req.params.id;

  AporteModel.findByPk(id).then((data) => {
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(500).send({ message: `Não foi localizado o id=${id}` });
    }
  });
};

const getAportesByInvestimentos = async (req, res) => {
  const id = req.params.id_investimento;
  AporteModel.findAll({
    raw: true,
    where: {
      id_investimento: id,
    },
    order: [
      ['ano', 'DESC'],
      ['mes', 'DESC'],
    ],
  })
    .then((aportes) => {
      res.json(aportes);
      res.statusCode = 200;
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

module.exports = {
  getAllAportes,
  postAporte,
  putAporte,
  deleteAporte,
  getOneAporte,
  getAportesByInvestimentos,
};
