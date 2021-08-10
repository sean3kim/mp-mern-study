const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BoulderSchema = new Schema({
    name: String,
    grade: Number,
    location: String,
    description: String,
    tags: {
        type: [String],
        enum: ["powerful", "endurance", "technical", "highball", "lowball", "crimpy", "slopey"]
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
})

module.exports = mongoose.model("Boulder", BoulderSchema);