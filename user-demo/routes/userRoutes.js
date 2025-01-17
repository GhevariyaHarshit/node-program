const express = require("express")
const route = express.Router();
const {getuser,createuser,updateuser,deleteuser,getusers} = require("../controllers/userController");
router.route("/").get(getusers).post(createuser)
router.route("/:id").get(getuser).put(updateuser).delete(deleteuser)

module.exports = router;