const Router = require('express').Router;
const gymController = require('../controllers/gymControllers');
const router = Router();

router.get('/', function (req, res) {
    return res.status(200).json({ message: 'response from gymRoutes.js' });
});

router.post('/signup', gymController.signup);
router.post('/login', gymController.login);

module.exports = router;