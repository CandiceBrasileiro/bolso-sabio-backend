const UserModel = require('../models/UserModel');
const UserService = require('../service/UserService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const NodemailController = require('../controllers/NodemailController');

    const getAllUsers = async (req, res) => {
        UserModel.findAll({
            raw: true
        })
        .then((users) => {
            res.json(users);
            res.statusCode = 200;
        })
        .catch((err) => {
            res.status(500).send({
            message: err.message,
            });
        });
    };

    const postUser = async (req, res) => {

        const dataHj = new Date();
        const dataRegistro = dataHj.toISOString().split('T')[0];
        const ativoTrue = 1;
        const password = req.body.senha;
        const saltRounds = 10;
        const ativoSenhaTemporaria = 0;
        const salt = bcrypt.genSaltSync(saltRounds);
        const passwordHash = bcrypt.hashSync(password, salt);
        
        
        const user = {
            nm_usuario: req.body.nm_usuario,
            cpf: req.body.cpf,
            email: req.body.email,
            senha: passwordHash,
            ativo: ativoTrue,
            create_at: dataRegistro,
            update_at: dataRegistro,
            ativo_senha_temporaria: ativoSenhaTemporaria
        }
        let erroMsg = 'Erro no servidor!';
        let statusCode = 500;
        console.log('postuser:', user)
        try {
            const response = await UserService.create(user);
            if(response.status === 'erro') {
                erroMsg = response.message;
                statusCode = 409;
                return res.status(statusCode).json({ message: erroMsg });
            } else {
                return res.status(201).json(response.newUser)
            }
        } catch (e) {
            res.status(500).send({
                message: erroMsg,
            });
        }
    };

    const putUser = async (req, res) => {

        const dataHj = new Date();
        const dataRegistro = dataHj.toISOString().split('T')[0];
        let id = req.params.id_usuario;
        let nm_usuario = req.body.nm_usuario;
        let email = req.body.email;
        const ativoTrue = 1;
        const ativoSenhaTemporaria = 0;

        UserModel.update(
            {
                nm_usuario: nm_usuario,            
                email: email,
                ativo: ativoTrue,
                update_at: dataRegistro
                
            },
            {
                where: {
                    id_usuario: id,
                }
            }
        ).then((dados) => {
            res.status(200).json(dados);
        })
        .catch((err) => {
            res.status(500).send({ message: err });
        });
    }

    const deleteUser = async (req, res) => {

        const dataHj = new Date();
        const dataRegistro = dataHj.toISOString().split('T')[0];
        let id = req.params.id_usuario;
        const ativoFalse = 0;

        UserModel.update(
            {
                ativo: ativoFalse,
                update_at: dataRegistro
            },
            {
            where: 
                {
                id_usuario:id
                }
            }
        )
        .then((dados) => {
            res.status(200).json(dados);
        })
        .catch((err) => {
            res.status(500).send({ message: err });
        });
    }

    const getOneUser = async (req, res) => {
        let id = req.params.id_usuario;
    
        UserModel.findByPk(id).then((data) => {
        if (data) {
    
            res.status(200).json(data);
        } else {
            res.status(500).send({ message: `Não foi localizado o id=${id}` });
        }
        });
    };

    const alterarSenha = async (req, res) => { 
        
        let id = req.params.id_usuario;
        let password = req.body.password;
        const dataHj = new Date();
        const dataRegistro = dataHj.toISOString().split('T')[0];
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const passwordHash = bcrypt.hashSync(password, salt);
        const ativoSenhaTemporaria = 0;
        
        UserModel.update(
            {
                senha: passwordHash,
                update_at: dataRegistro,
                ativo_senha_temporaria: ativoSenhaTemporaria
            },
            {
                where: 
                {
                    id_usuario:id
                }
            }
        ).then((dados) => {
            res.status(200).json(dados);
        })
        .catch((err) => {
            res.status(500).send({ message: err });
        });
    }
// colocar método que veja se já tem email cadastrado
    const postLogin = async (req, res) => {

        const password = req.body.senha;
        const email = req.body.email;
        
        if(!email){
            return res.status(422).json({msg: 'O e-mail é obrigatório'})
        }
        if(!password){
            return res.status(422).json({msg: 'A senha é obrigatório'})
        }
        const user = await UserModel.findOne({where: {email: email}});

        if(!user){
            return res.status(204).json({msg: 'Usuário não cadastrado!'})
        }
        const checkPassword = await bcrypt.compare(password, user.senha);

        if(!checkPassword) {
            return res.status(422).json({msg: 'Senha inválida'})
        }
        
        try {
            const secret = process.env.SECRET;
        
            const token = jwt.sign(
                {
                    id: user.id_usuario,
                },
                
                secret,
                {
                    expiresIn:300 //expires in 5min
                },
                )
            
                const result = {msg: "Autenticação realizada com sucesso", token, nome: user.nm_usuario, id: user.id_usuario, ativo_senha_temporaria: user.ativo_senha_temporaria}

                res.status(200).json(result)
        } catch (e) {
            res.status(500).json({
                msg: 'Erro no servidor, tente mais tarde!'
            })
        }
    }

    const getUser = async (req, res) => {

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(" ")[1]

        const payLoad = jwt.decode(token);

        const {id} = payLoad;
        
        const user = await UserModel.findByPk(id);

        if (!user){
            res.status(204).json({msg: 'Usuário não encontrado'})
        } 
        res.status(200).json({id_usuario: user.id_usuario, nm_usuario:user.nm_usuario,cpf:user.cpf, email: user.email, ativo: user.ativo});
    }

    const checkToken = (req, res, next) => {

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(" ")[1]

        if(!token) {
            return res.status(401).json({msg: 'Acesso negado'})
        }

        try {
            const secret = process.env.SECRET;
            jwt.verify(token, secret)
            next()
        } catch (e) {
            res.status(400).json({msg: 'Token inválido!'})
        }
    }

    const recuperarSenha = async (req, res) => {

        const email = req.body.email;

        const userFind = await UserService.getUserByEmail(email);

        req.body.nome = userFind.nm_usuario;

        if(!userFind){
            res.status(204).json({msg: 'E-mail não encontrado!'})
        }

        const newPassword = await UserService.changePassword(userFind);
        

        if(newPassword){
            const mens = `Olá ${userFind.nm_usuario}, utilize a senha temporária ${newPassword.password} para fazer login e em seguida cadastre uma nova senha.`;

            req.body.mensagem = mens;

            NodemailController.postNodemail(req,res);
        }
    }


    

module.exports = {
    getAllUsers,
    postUser,
    putUser,
    deleteUser,
    getOneUser,
    alterarSenha,
    postLogin,
    getUser,
    checkToken,
    recuperarSenha
};