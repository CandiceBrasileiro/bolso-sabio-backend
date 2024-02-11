const { check, validationResult } = require('express-validator');

exports.validateProventoPost = [
  check('id_investimento')
    .not()
    .isEmpty()
    .withMessage('Válido apenas para proventos existentes!'),
  check('provento')
    .not()
    .isEmpty()
    .withMessage('O valor do provento não pode ser vazio!')
    .isCurrency()
    .withMessage('Tem que ser um número')
    .bail(),
  check('mes').not().isEmpty().withMessage('O mês é obrigatório'),
  check('ano').not().isEmpty(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const erros = errors.array().map((item) => {
        return { message: item.msg };
      });
      return res.status(422).json(erros);
    }
    next();
  },
];

exports.validateProventoPut = [
  check('id_investimento')
    .not()
    .isEmpty()
    .withMessage('Válido apenas para proventos existentes!')
    .bail(),
  check('provento')
    .not()
    .isEmpty()
    .isCurrency()
    .withMessage('O valor do provento não pode ser vazio!')
    .bail()
    .withMessage('Tem que ser um número')
    .bail(),
  check('mes').not().isEmpty().withMessage('O mês é obrigatório').bail(),
  check('ano')
    .not()
    .isEmpty()
    .withMessage('O ano é obrigatório')
    .bail()
    .isNumeric()
    .withMessage('Digite um valor válidoo'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const erros = errors.array().map((item) => {
        return { message: item.msg };
      });
      return res.status(422).json(erros);
    }
    next();
  },
];


