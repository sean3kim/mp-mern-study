const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BoulderSchema = new Schema({
    name: String,
    grade: Number,
    location: String,
})

module.exports = mongoose.model("Boulder", BoulderSchema);