const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BoulderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: String,
    tags: {
        type: [String],
        enum: ["powerful", "endurance", "technical", "highball", "lowball", "crimpy", "slopey"]
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
})

module.exports = mongoose.model("Boulder", BoulderSchema);