const Router = require('express').Router;
const router = Router();

const { login } = require('../controllers/gymControllers');
const {
    addPlan,
    getPlans,
    deletePlan,
    updatePlan
} = require('../controllers/planControllers');

const loginProtect = require('../middleware/loginProtect');


router.get('/', function (req, res) {
    return res.status(200).json({ message: 'response from planRoutes.js' });
});

router.use(loginProtect);
router.post('/addPlan',addPlan);
router.get('/getPlans', getPlans);
router.post('/deletePlan/:planId', deletePlan);
router.post('/updatePlan/:planId',  updatePlan);


module.exports = router;