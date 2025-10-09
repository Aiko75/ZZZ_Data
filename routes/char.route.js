const express = require("express");
const router = express.Router();
const charController = require("../controllers/char.controller");

router.get("/characters", charController.getCharacters);

router.post("/character", charController.postCharacter);

router.post("/characters", charController.postManyCharacters);

router.put("/characters", charController.putManyCharacters);

module.exports = router;
