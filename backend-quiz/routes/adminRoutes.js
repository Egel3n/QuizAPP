const { Router } = require("express");
const adminController = require("../controllers/adminController");
const router = Router();

router.post("/create", adminController.admin_create);

module.exports = router;
