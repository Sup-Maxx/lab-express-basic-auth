const router = require("express").Router()
const bcrypt = require("bcryptjs")
saltRounds = 10

const User = require("../models/user.model")

router.get("/signup", (req,res) => {
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

router.get("/profile", (req,res) => {
    res.render("user/user-profile")
})

module.exports = router