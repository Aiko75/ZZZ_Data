const express = require("express");
const router = express.Router();
const charController = require("../controllers/char.controller");

/**
 * @swagger
 * /api/zzz/characters:
 *   get:
 *     summary: Lấy danh sách toàn bộ nhân vật
 *     tags: [Characters]
 *     responses:
 *       200:
 *         description: Lấy thành công danh sách nhân vật
 */
router.get("/characters", charController.getCharacters);

/**
 * @swagger
 * /api/zzz/character:
 *   post:
 *     summary: Thêm mới một nhân vật
 *     tags: [Characters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Lucia
 *     responses:
 *       201:
 *         description: Nhân vật được thêm thành công
 */
router.post("/character", charController.postCharacter);

/**
 * @swagger
 * /api/zzz/characters:
 *   post:
 *     summary: Thêm nhiều nhân vật cùng lúc
 *     tags: [Characters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: Corin
 *     responses:
 *       201:
 *         description: Danh sách nhân vật được thêm thành công
 */
router.post("/characters", charController.postManyCharacters);

/**
 * @swagger
 * /api/zzz/characters:
 *   put:
 *     summary: Cập nhật nhiều nhân vật
 *     tags: [Characters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 6708a0d9e24f0f0012b31244
 *                 name:
 *                   type: string
 *                   example: Lucia Crimson
 *     responses:
 *       200:
 *         description: Cập nhật thành công danh sách nhân vật
 */
router.put("/characters", charController.putManyCharacters);

module.exports = router;
