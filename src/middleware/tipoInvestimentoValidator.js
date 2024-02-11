const { check, validationResult } = require('express-validator');

exports.validateTipoInvestimentoPost = [
  check('nome')
    .not()
    .isEmpty()
    .withMessage('Campo deve ser preenchido!')
    .isString(),
  check('tipo_renda')
    .not()
    .isEmpty()
    .withMessage('Campo não deve ficar vazio!')
    .isNumeric(),
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

exports.validateTipoInvestimentoPut = [
  check('nome')
    .not()
    .isEmpty()
    .withMessage('Campo deve ser preenchido!')
    .isString(),
  check('tipo_renda')
    .not()
    .isEmpty()
    .withMessage('Campo não deve ficar vazio!')
    .isNumeric(),
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
