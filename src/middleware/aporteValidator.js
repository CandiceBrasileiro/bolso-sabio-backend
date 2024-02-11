const { check, validationResult } = require('express-validator');

exports.validateAportePost = [
  check('id_investimento')
    .not()
    .isEmpty()
    .withMessage('Campo ID deve ser preenchido.')
    .isNumeric()
    .withMessage('Valor deve ser numérico'),
  check('valor_aportado')
    .not()
    .isEmpty()
    .withMessage('Campo de VALOR deve ser preenchido.'),
  check('valor_ativo'),
  check('quantidade')
    .not()
    .isEmpty()
    .withMessage('Campo QUANTIDADE deve ser preenchido.'),
  check('mes').not().isEmpty().withMessage('Campo MES deve ser preenchido.'),
  check('ano').not().isEmpty().withMessage('Campo ANO deve ser preenchido.'),
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

exports.validateAportePut = [
  check('id_investimento')
    .not()
    .isEmpty()
    .withMessage('Campo ID deve ser preenchido.')
    .isNumeric()
    .withMessage('Valor deve ser numérico'),
  check('valor_aportado')
    .not()
    .isEmpty()
    .withMessage('Campo de VALOR deve ser preenchido.'),
  check('valor_ativo'),

  check('quantidade')
    .not()
    .isEmpty()
    .withMessage('Campo QUANTIDADE deve ser preenchido.'),
  check('mes').not().isEmpty().withMessage('Campo MES deve ser preenchido.'),
  check('ano').not().isEmpty().withMessage('Campo ANO deve ser preenchido.'),
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
