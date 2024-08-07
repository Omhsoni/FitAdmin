const Router = require('express').Router;
const router = Router();
const loginProtect = require('../middleware/loginProtect');

const {
    addTrainer,
    getTrainers,
    deleteTrainer,
    updateTrainer,
    getTrainer
} = require("../controllers/trainerControllers")

router.get('/', function (req, res) {
    return res.status(200).json({ message: 'response from trainerRoutes.js' });
});

router.use(loginProtect);
router.post('/addTrainer',addTrainer);
router.get('/getTrainers',getTrainers);
router.get('/getTrainer/:trainerId',getTrainer);
router.delete('/deleteTrainer/:trainerId',deleteTrainer);
router.post('/updateTrainer/:trainerId',updateTrainer);



module.exports = router;