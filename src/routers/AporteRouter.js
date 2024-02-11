const router = require('express').Router();
const {
  validateAportePost,
  validateAportePut,
} = require('../middleware/aporteValidator');
const {
  getAllAportes,
  postAporte,
  putAporte,
  deleteAporte,
  getOneAporte,
  getAportesByInvestimentos,
} = require('../controllers/AporteController');

router.get('/aportes/', getAllAportes);
router.post('/aporte/', validateAportePost, postAporte);
router.put('/aporte/:id', putAporte);
router.delete('/aporte/:id', deleteAporte);
router.get('/aporte/:id', getOneAporte);
router.get('/aportes/:id_investimento', getAportesByInvestimentos);

module.exports = router;
