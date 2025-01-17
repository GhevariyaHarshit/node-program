const express = require("express");
const {register,login,forgotPassword,resetPassword,requestPasswordReset,getusers,updateUser,deleteUser,user} = require("../controllers/authController");
const router = express.Router();

router.post("/register",register);
router.route("/user/:id").get(user).put(updateUser).delete(deleteUser)
router.post("/login",login);
// router.post("/requestPasswordReset",requestPasswordReset)
// router.post("/resetPassword",resetPassword)
router.post("/forgotPassword",forgotPassword)
router.get("/users",getusers)
// router.route("/buy").post(createBuy)

module.exports = router;