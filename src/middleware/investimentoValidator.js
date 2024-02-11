const { check, validationResult } = require('express-validator');

exports.validateInvestimentoPost = [
  check('id_tipo_investimento')
    .not()
    .isEmpty()
    .withMessage(
      'O investimento deve ficar atrelado a um tipo de investimento cadastrado!',
    )
    .isNumeric()
    .withMessage('O id é um valor numerico!'),
  check('ativo')
    .not()
    .isEmpty()
    .withMessage('Campo NOME DO ATIVO não deve ficar vazio!'),
  check('valor_uni_ativo')
    .not()
    .isEmpty()
    .withMessage('Campo VALOR UNITÁRIO não deve ficar vazio!'),
  check('valor_investido'),
  check('segmento').optional(),
  check('quantidade')
    .not()
    .isEmpty()
    .withMessage('Campo QUANTIDADE deve ser preenchido!')
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

exports.validateInvestimentoPut = [
  check('id_tipo_investimento')
    .not()
    .isEmpty()
    .withMessage(
      'O investimento deve ficar atrelado a um tipo de investimento cadastrado!',
    )
    .isNumeric()
    .withMessage('O id é um valor numerico!'),
  check('ativo')
    .not()
    .isEmpty()
    .withMessage('Campo NOME DO ATIVO não deve ficar vazio!'),
  check('valor_uni_ativo')
    .not()
    .isEmpty()
    .withMessage('Campo VALOR UNITÁRIO não deve ficar vazio!'),
  check('segmento').optional(),
  check('quantidade')
    .not()
    .isEmpty()
    .withMessage('Campo QUANTIDADE deve ser preenchido!')
    .isNumeric(),
  check('valor_investido'),
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
