const {
  validateTipoInvestimentoPost,
  validateTipoInvestimentoPut,
} = require('../middleware/tipoInvestimentoValidator');
const router = require('express').Router();

const {
  getAllTiposInvestimentos,
  postTipoInvestimento,
  putTipoInvestimento,
  deleteTipoInvestimento,
  getOneTipoInvestimento,
} = require('../controllers/TipoInvestimentoController');

router.get('/tiposInvestimentos', getAllTiposInvestimentos);
router.post(
  '/tipoInvestimento',
  validateTipoInvestimentoPost,
  postTipoInvestimento,
);
router.put(
  '/tipoInvestimento/:id',
  validateTipoInvestimentoPut,
  putTipoInvestimento,
);
router.delete('/tipoInvestimento/:id', deleteTipoInvestimento);
router.get('/tipoInvestimento/:id', getOneTipoInvestimento);

module.exports = router;
