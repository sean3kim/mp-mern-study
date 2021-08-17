// require("dotenv").config({ path: "../.env" });
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const maxAge = 60 * 60 * 24 * 3

exports.register = async (req, res) => {
    const { username, password, email } = req.body;
    const user = new User({ username, password, email });
    const token = user.getSignedJWT();
    await user.save();
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge })
    res.json(user)
}

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username })
    const isMatch = user.matchPasswords(password);

    const token = user.getSignedJWT();

    if (isMatch) {
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
    }
    res.send(req.user);
}

exports.logout = (req, res) => {
    if (req.cookies.jwt) {
        res.cookie("jwt", "", { expiresIn: Date.now() })
        res.send("logged out");
    } else {
        res.send("no user logged in to logout")
    }
}

exports.checkLoggedIn = async (req, res) => {
    const token = req.cookies.jwt;
    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded.id })
        if (user) res.json(user);
        else res.send(false);
    } else {
        console.log("error not logged in")
        res.send(false);
    }
}

exports.secret = (req, res) => {
    res.send("in secret page")
}
