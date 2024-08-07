const router = require('express').Router();
const loginProtect = require('../middleware/loginProtect');
const {
    getDashboardData
} = require('../controllers/dashboardControllers');

router.use(loginProtect);
router.get('/', getDashboardData);

module.exports = router;