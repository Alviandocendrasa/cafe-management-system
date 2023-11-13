const db = require("../models");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const UserEntity = require("../entities/userEntity");
const UserProfileEntity = require("../entities/userProfileEntity");

class AuthController {
    /* ============================= Controller methods ============================= */

    async login(req, res, next) {
        try {
            const { username, password } = req.body

            const userEntity = new UserEntity();
            const user = await userEntity.findUserByUsername(username);

            if (!user) {
                return next({
                    httpCode: 404,
                    message: "User not found, please register first!"
                })
            }

            const isMatch = await userEntity.comparePassword(user, password);

            if (!isMatch) {
                return next({
                    httpCode: 404,
                    message: "Username or password is incorrect!"
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

            const userEntity = new UserEntity();
            const currentUser = await userEntity.getUser(decoded.id);
            console.log(decoded);

            if (!currentUser) {
                return next({
                    httpCode: 401,
                    message: 'The user belonging to this token not longer exist.'
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

    signToken(data) {
        return jwt.sign(data, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
    }

    createSendToken = (user, statusCode, req, res) => {
        const token = this.signToken({id: user._id});

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