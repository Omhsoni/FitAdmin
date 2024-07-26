const Router = require("express").Router;
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/gymControllers");
const router = Router();
 
router.get("/", function (req, res) {
  return res.status(200).json({ message: "response from gymRoutes.js" });
});

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
