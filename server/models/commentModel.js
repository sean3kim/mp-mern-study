const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "User" },
    date: String,
    title: String,
    body: String,
})

module.exports = mongoose.model("Comment", CommentSchema);