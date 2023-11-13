const express = require("express");
const AuthController = require("../controllers/authController");

const router = express.Router();
const authController = new AuthController();

/**
 * @swagger
 * /api/auth/login/:
 *   post:
 *     summary: User login
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 */
router.post("/login", authController.login.bind(authController));

module.exports = router;