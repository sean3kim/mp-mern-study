// require("dotenv").config({ path: "../.env" });
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthorized = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded.id })
        if (user) next();
        else res.send("not authorized");
    } else {
        console.log("error not authorized")
        res.send("not authorized");
    }
}