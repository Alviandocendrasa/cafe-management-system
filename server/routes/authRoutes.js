const express = require("express");
const { register, login } = require("../handlers/auth");

const router = express.Router();

/**
 * @swagger
 * /api/auth/register/:
 *   post:
 *     summary: User register
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
 *               phoneNumber:
 *                 type: integer
 *               role:
 *                 type: string
 *               username:
 *                 type: string
 *               maxBidSlots:
 *                  type: integer
 *             required:
 *                - email
 *                - password
 *                - phoneNumber
 *                - role               
 *                - username
 *                - maxBidSlots 
 */
router.post("/register", register);

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
router.post("/login/", login)

module.exports = router;