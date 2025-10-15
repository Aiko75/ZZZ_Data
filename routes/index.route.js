const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index.controller");

/**
 * @swagger
 * tags:
 *   - name: Characters
 *     description: Quản lý thông tin nhân vật trong ZZZ
 *   - name: Utility
 *     description: Các tiện ích phụ trợ của hệ thống
 */

/**
 * @swagger
 * /api/zzz/image-proxy:
 *   get:
 *     summary: Lấy hình ảnh nhân vật qua proxy
 *     tags: [Utility]
 *     parameters:
 *       - in: query
 *         name: url
 *         schema:
 *           type: string
 *           example: https://example.com/image.png
 *         required: true
 *         description: URL gốc của hình ảnh cần proxy
 *     responses:
 *       200:
 *         description: Trả về hình ảnh đã được proxy
 *       400:
 *         description: Thiếu URL hoặc URL không hợp lệ
 */
router.get("/image-proxy", indexController.getImageCharacters);

// Gộp các route con từ char.route.js (Swagger sẽ đọc luôn nếu có comment @swagger bên trong)
router.use("/", require("./char.route"));

module.exports = router;
