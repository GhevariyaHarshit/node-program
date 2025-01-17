const express = require("express")
const router = express.Router();
const {buys, productBuyCreate, productBuyUpdate, buyProductDelete} = require("../controllers/productBuyController")
router.route("/").get(buys)
router.route("/create").post(productBuyCreate)
router.route("/update/:id").put(productBuyUpdate)
router.route("/delete/:id").delete(buyProductDelete)

module.exports = router;