const Router = require('express').Router;
const router = Router();

const { login } = require('../controllers/gymControllers');
const {
    addPlan,
    getPlans,
    deletePlan
} = require('../controllers/planControllers');

const loginProtect = require('../middlewares/loginProtect');


router.get('/', function (req, res) {
    return res.status(200).json({ message: 'response from planRoutes.js' });
});

// router.use(loginProtect);
router.post('/addPlan',addPlan);
router.post('/getPlans/:gymId', getPlans);
router.post('/deletePlan/:planId', deletePlan);


module.exports = router;