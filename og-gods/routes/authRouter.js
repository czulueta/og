const express = require("express");
const authRouter = express.Router();
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

// Signup - POST
// Does the usr with the username aleady exist
// create the new user and save in the db
// throw error ("username already exists")
// send back the New user object, & a token
authRouter.post("/signup", (req, res, next) => {
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        if(user !== null){
            res.status(400)
            return next(new Error("I'm sorry, but that username already exists, please think of a different entry"))
        }

        const newUser = new User(req.body)
        newUser.save((err, savedUser) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            const token = jwt.sign(savedUser.toObject(), process.env.SECRET)
            return res.status(201).send({user: savedUser.toObject(), token })
        })
    })
})


// Login - POST
authRouter.post("/login", (req, res, next) => {
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500)
            return next (err)
        }
        if(!user || user.password !== req.body.password){
            res.status(500)
            return next(new Error("Username or Password is Invalid"))
        }
        const token = jwt.sign(user.toObject(), process.env.SECRET)
        return res.status(200).send({ user: user.toObject(), token })
    });
});

module.exports = authRouter