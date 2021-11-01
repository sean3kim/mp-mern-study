const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AreaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    description: {
        type: String
    },
    boulders: [{ type: Schema.Types.ObjectId, ref: "Boulder" }],
    path: [{ type: Schema.Types.ObjectId, ref: "Area" }],
    parent: {
        type: Schema.Types.ObjectId, ref: "Area"
    }
})

module.exports = mongoose.model("Area", AreaSchema);