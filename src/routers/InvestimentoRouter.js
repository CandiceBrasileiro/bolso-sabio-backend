const router = require('express').Router();
const {
  validateInvestimentoPost,
  validateInvestimentoPut,
} = require('../middleware/investimentoValidator');
const {
  getAllInvestimentos,
  postInvestimento,
  putInvestimento,
  deleteInvestimento,
  getOneInvestimento,
  getInvestimentosByIdUsuario
} = require('../controllers/InvestimentoController');

router.get('/investimentos', getAllInvestimentos);
router.post('/investimento', validateInvestimentoPost, postInvestimento);
router.put('/investimento/:id', validateInvestimentoPut, putInvestimento);
router.delete('/investimento/:id', deleteInvestimento);
router.get('/investimento/:id', getOneInvestimento);
router.get('/investimento_user/:id_usuario', getInvestimentosByIdUsuario);

module.exports = router;
