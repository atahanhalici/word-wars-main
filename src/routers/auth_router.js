const router = require('express').Router();
const authController = require('../controllers/auth_controller');



router.get('/singlekelime', authController.singlekelimegetir);
router.post('/singlekelime', authController.singlekelimeyolla);


router.post('/kullanicilogin', authController.login);
router.post('/kullaniciregister', authController.register);

module.exports = router;