const User = require("../models/userModel");

exports.register = async (req, res) => {
    const { username, password, email } = req.body;
    const user = new User({ username, password, email });
    const registeredUser = await User.register(user, password);
    res.json(registeredUser)
}

exports.login = (req, res) => {
    res.send(req.user);
}

exports.logout = (req, res) => {
    if (req.user) {
        req.logout();
        res.send("logged out");
    } else {
        res.send("no user logged in to logout")
    }
}

exports.checkLoggedIn = (req, res) => {
    if (req.user) {
        res.json(req.user)
    } else {
        res.json(null)
    }
}

exports.secret = (req, res) => {
    res.send("in secret page")
}