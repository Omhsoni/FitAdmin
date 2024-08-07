const Router = require("express").Router;
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updateGym,
} = require("../controllers/gymControllers");
const router = Router();
const loginProtect = require("../middleware/loginProtect");
 
router.get("/", function (req, res) {
  return res.status(200).json({ message: "response from gymRoutes.js" });
});

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/updateGym", loginProtect, updateGym);
module.exports = router;
