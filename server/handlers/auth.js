const db = require("../models");
const jwt = require("jsonwebtoken");

exports.register = async function(req, res, next){
    try{
        console.log("post data signup: ", req.body)

        const { email, password, role, username, phoneNumber } = req.body;

        const newUser = await db.User.create({email, password})
        console.log(newUser)

        const newUserProfile = await db.UserProfile.create({userId: newUser._id, username, phoneNumber, role})
        console.log("new user profile: ", newUserProfile)

        return res.status(200).json({
            status: "success",
            message: "User registered successfully",
            data: {
                email,
                password,
                role,
                username,
                phoneNumber
            }
         });
    }
    catch(error){
        console.log("error: ", error)
        return next({
            httpCode: 400,
            message: error.message
        })
    }  
}

exports.login = async function(req, res, next){
    try{
        console.log("post data login: ", req.body)
        const {email} = req.body

        const user = await db.User.findOne({
            email
        })

        if(!user){
            return next({
                httpCode: 404,
                message: "User not found, please register first!"
            })
        }

        console.log("user: ", user)

        return res.status(200).json({
            status: "success",
            message: "User login successfully",
            data: user
         });
    }
    catch(error){
        console.log("error: ", error)
        return next({
            httpCode: 400,
            message: error.message
        })
    }  
}