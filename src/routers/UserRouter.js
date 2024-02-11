const router = require('express').Router();
const {
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
} = require('../controllers/UserController');
const {postNodemail} = require('../controllers/NodemailController');
const {
    validateUserPost, 
    validateUserPut, 
    validateAlterarSenha
} = require('../middleware/userValidator');

router.get('/users/', getAllUsers);
router.post('/user/', validateUserPost, postUser);
router.put('/user/:id_usuario', validateUserPut, putUser);
router.put('/user/delete/:id_usuario', deleteUser);
router.get('/user/:id_usuario', getOneUser);
router.put('/user/changepassword/:id_usuario', validateAlterarSenha,alterarSenha);
router.post('/autenticar/', postLogin);
router.get('/user/', checkToken, getUser);
router.get('/user/validate/', checkToken);
router.post('/send', postNodemail);
router.post('/recuperarsenha', recuperarSenha);


module.exports = router;
