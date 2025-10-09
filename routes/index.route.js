const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index.controller");

router.use("/", require("./char.route"));

router.get("/image-proxy", indexController.getImageCharacters);

module.exports = router;
