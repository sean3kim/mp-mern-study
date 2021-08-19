const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/ErrorResponse");

const maxAge = 60 * 60 * 24 * 3

exports.register = async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        const user = new User({ username, password, email });
        const token = user.getSignedJWT();
        await user.save();
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge })
        res.json(user)
    } catch (e) {
        next(e);
    }
}

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return next(new ErrorResponse("please provide username and password", 401));
    }

    try {
        const user = await User.findOne({ username })
        const isMatch = await user.matchPasswords(password);

        const token = user.getSignedJWT();

        if (!isMatch) {
            return next(new ErrorResponse("invalid credentials", 401));
        }
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
        res.send(req.user);
    } catch (e) {
        next(e);
    }
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
        res.send(false);
    }
}

exports.secret = (req, res) => {
    res.send("in secret page")
}
