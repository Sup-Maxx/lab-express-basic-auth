const router = require("express").Router()


router.get("/signup", (req,res) => {
    res.render("auth/signup")
})

router.post("/signup", (req,res) => {
    console.log(req.body)
    const {username, password} = req.body

    .then((user) => console.log(user))
    res.redirect("/profile")
})

router.get("/profile", (req,res) => {
    res.render("user/user-profile")
})

module.exports = router