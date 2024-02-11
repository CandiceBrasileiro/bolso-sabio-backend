const router = require('express').Router();
const {
  validateProventoPost,
  validateProventoPut,
} = require('../middleware/proventoValidator');
const {
  getAllProventos,
  postProvento,
  putProvento,
  deleteProvento,
  getOneProvento,
  getProventosByInvestimentos,
  getPeriodoProvento,
} = require('../controllers/ProventoController');

router.get('/proventos/', getAllProventos);
router.post('/provento', validateProventoPost, postProvento);
router.put('/provento/:id', validateProventoPut, putProvento);
router.delete('/provento/:id', deleteProvento);
router.get('/provento/:id', getOneProvento);
router.get('/proventos/:id_investimento', getProventosByInvestimentos);
router.get('/proventosData/', getPeriodoProvento);

module.exports = router;
