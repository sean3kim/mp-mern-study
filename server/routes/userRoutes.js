const express = require("express");
const router = express.Router();
const passport = require("passport");
const { isLoggedIn } = require("../middleware/auth");

const {
    register,
    login,
    logout,
    checkLoggedIn,
    secret
} = require("../controllers/usersController");





router.route("/register")
    .post(register)

router.route("/login")
    .post(passport.authenticate("local"), login)

router.route("/logout")
    .post(logout)

router.route("/checkLoggedIn")
    .get(checkLoggedIn)

router.route("/secret")
    .get(isLoggedIn, secret)

module.exports = router;