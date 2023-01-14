const router = require("express").Router()
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

saltRounds = 10

const User = require("../models/user.model")
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');

//signup GET and POST
router.get("/signup", isLoggedOut, (req,res) => {
    res.render("auth/signup")
})

router.post("/signup", (req,res) => {
    const {username, password} = req.body

    bcrypt
    .genSalt(saltRounds)
    .then((salt) => {
        console.log("password: " + password)
        console.log("salt: " + salt)
        return bcrypt.hash(password, salt)
    })
    .then((hashedPassword) => {
        console.log("New account was created. Username: " + username + " with password " + hashedPassword)
        User.create({
            username: username,
            passwordHash: hashedPassword
    })
    res.redirect("/profile")
})
})

//login GET and POST
router.get("/login", (req,res) => {
    res.render("auth/login")
})

router.post("/login", (req,res) => {
    const {email, password} = req.body

    User.findOne({email})
    .then(user => {
        console.log(user)
        if(bcrypt.compareSync(password, user.passwordHash)) {
            res.redirect("/profile")
        }
    })
})

router.get("/profile", (req,res) => {
    res.render("user/user-profile")
})

module.exports = router