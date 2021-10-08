const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    boulder: [{ type: Schema.Types.ObjectId, ref: "Boulder" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
})



// this refers to the document that is being saved
UserSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.getSignedJWT = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "10min" })
}

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

module.exports = mongoose.model("User", UserSchema);