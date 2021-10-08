const express = require("express");
const router = express.Router();
const { isAuthorized } = require("../middleware/auth");

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
    .post(login)

router.route("/logout")
    .post(logout)

router.route("/checkLoggedIn")
    .get(checkLoggedIn)

router.route("/secret")
    .get(isAuthorized, secret)

module.exports = router;