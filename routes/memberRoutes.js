const router = require("express").Router();
const loginProtect = require("../middleware/loginProtect");
const {
  addMember,
  getMembers,
  deleteMember,
  updateMember,
  getMember,
} = require("../controllers/memberControllers");

router.get("/", function (req, res) {
  return res.status(200).json({ message: "response from memberRoutes.js" });
});


router.use(loginProtect);
router.post("/addMember", addMember);
router.get("/getMembers", getMembers);
router.get("/getMember/:memberId", getMember);
router.delete("/deleteMember/:memberId", deleteMember);
router.post("/updateMember/:memberId", updateMember);

module.exports = router;