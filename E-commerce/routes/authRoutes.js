const express = require("express");
// const { model } = require("mongoose");
const {register,login,resetPassword,requestPasswordReset,getusers,updateUser,deleteUser,user} = require("../controllers/authController");
const {cartcreate,updateCart,deletecart,carts} = require("../controllers/cartController")
// const { reset } = require("nodemon");
const router = express.Router();

router.post("/register",register);
router.route("/user/:id").get(user).put(updateUser).delete(deleteUser)
router.post("/login",login);
router.post("/requestPasswordReset",requestPasswordReset)
router.post("/resetPassword",resetPassword)
router.get("/users",getusers)
router.post("/addToCart",cartcreate)
router.route("/cart/:id").put(updateCart).delete(deletecart).get(carts)

module.exports = router;