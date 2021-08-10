const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    boulder: [{ type: Schema.Types.ObjectId, ref: "Boulder" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
})

module.exports = mongoose.model("User", UserSchema);