const db = require("../models");
const UserEntity = require("../entities/userEntity");
const UserProfileEntity = require("../entities/userProfileEntity")

const jwt = require("jsonwebtoken");
const { promisify } = require("util")

class AuthController {
    /* ============================= Controller methods ============================= */

    async register(req, res, next) {
        try {
            const { email, password, role, username, phoneNumber, maxBidSlots } = req.body;


            const userEntity = new UserEntity();
            const newUser = await userEntity.createUser(email, password);

            const userProfileEntity = new UserProfileEntity();
            const newUserProfile = await userProfileEntity.createUserProfile(newUser._id, username, phoneNumber, role, maxBidSlots)

            return res.status(200).json({
                status: "success",
                message: "User registered successfully",
                data: {
                    email,
                    role,
                    username,
                    phoneNumber,
                    maxBidSlots
                }
            });
        }
        catch (error) {
            return next({
                httpCode: 400,
                message: error.message
            })
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body

            const user = await db.User.findOne({
                email
            })

            if (!user) {
                return next({
                    httpCode: 404,
                    message: "User not found, please register first!"
                })
            }

            const userEntity = new UserEntity();
            const isMatch = await userEntity.comparePassword(user, password);

            if (!isMatch) {
                return next({
                    httpCode: 404,
                    message: "Email or password is incorrect!"
                })
            }

            this.createSendToken(user, 200, req, res);
        }
        catch (error) {
            return next({
                httpCode: 400,
                message: error.message
            })
        }
    }

    async protect(req, res, next) {
        try {
            let token;

            if (!req.headers.authorization) {
                return next({
                    httpCode: 401,
                    message: 'Please specify bearer auth token with jwt to retrieve data'
                })
            }

            if (
                req.headers.authorization &&
                req.headers.authorization.startsWith('Bearer')
            ) {
                token = req.headers.authorization.split(' ')[1];
            } else if (req.cookies.jwt) {
                token = req.cookies.jwt;
            }

            if (!token) {
                return next({
                    httpCode: 401,
                    message: 'You are not logged in! Please log in to get access.'
                })
            }

            const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

            const currentUser = await db.User.findById(decoded.id);
            if (!currentUser) {
                return next({
                    httpCode: 401,
                    message: 'The user belonging to this token does no longer exist.'
                })
            }

            req.user = currentUser;
            res.locals.user = currentUser;
            next();
        }
        catch (error) {
            return next({
                httpCode: 400,
                message: error.message
            })
        }
    }

    /* =============================== Helper methods =============================== */

    signToken(id) {
        return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
    }

    createSendToken = (user, statusCode, req, res) => {
        const token = this.signToken(user._id);

        res.cookie('jwt', token, {
            expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
            secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
        });

        // Remove password from output
        user.password = undefined;

        res.status(statusCode).json({
            status: 'success',
            message: 'Login successfully',
            data: {
                token,
                user
            }
        });
    };
}

module.exports = AuthController;