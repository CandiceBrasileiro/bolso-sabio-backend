const { check, validationResult } = require('express-validator');

exports.validateUserPost = [
    check('nm_usuario')
    .not()
    .isEmpty()
    .withMessage('Campo nome deve ser prenchido'),
    check('cpf')
    .not()
    .isEmpty()
	.isLength({ min: 11, max: 11 }),
    check('email')
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('Insira seu melhor e-mail'),
    check('senha')
    .not()
    .isEmpty()
    .isLength({ min: 7 })
    .withMessage('Senha deve ter no mínimo 7 caracteres'),
    (req, res, next) => {
        const errors = validationResult(req);

    if ( !errors.isEmpty() ) {
        const erros = errors.array().map((item) => {
            return {message: item.msg};
        })
        return res.status(422).json(errors);
    } 
    next();
    }
];

exports.validateUserPut = [
    check('nm_usuario')
    .not()
    .isEmpty()
    .withMessage('Campo nome deve ser prenchido'),
    check('email')
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('Insira seu melhor e-mail'),
    
    (req, res, next) => {
        const errors = validationResult(req);

    if ( !errors.isEmpty() ) {
        const erros = errors.array().map((item) => {
            return {message: item.msg};
        })
        return res.status(422).json(errors);
    } 
    next();
    }
];

exports.validateAlterarSenha = [
    check('password')
    .not()
    .isEmpty()
    .isLength({ min: 7 })
    .withMessage('Senha deve ter no mínimo 7 caracteres'),
    (req, res, next) => {
        const errors = validationResult(req);

    if ( !errors.isEmpty() ) {
        const erros = errors.array().map((item) => {
            return {message: item.msg};
        })
        console.log('aaaa', erros)
        return res.status(422).json(errors);
    } 
    next();
    }
];
