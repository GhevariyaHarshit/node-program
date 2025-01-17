const express = require("express")
const router = express.Router();
const {cartcreate,updateCart,deletecart,carts} = require("../controllers/cartController");
router.post("/addToCart",cartcreate)
router.route("/cart/:id").put(updateCart).delete(deletecart).get(carts)

module.exports = router;