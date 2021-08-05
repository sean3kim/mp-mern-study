const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Boulder = require("./models/boulderModel");

const app = express();

const dbURL = process.env.DB_URL || "mongodb://localhost:27017/mp-mern"
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("database connected")
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
    const allBoulders = await Boulder.find();
    res.json(allBoulders);
})

app.post("/new", async (req, res) => {
    const newBoulder = { ...req.body };
    const addBoulder = new Boulder(newBoulder);
    await addBoulder.save();
    res.json(addBoulder);
})

app.delete("/", async (req, res) => {
    const { id } = req.body;
    await Boulder.findByIdAndDelete(id);
    res.send("deleted");
})

app.put("/", async (req, res) => {
    const boulder = { ...req.body };
    const editedBoulder = await Boulder.findByIdAndUpdate(boulder._id, boulder, { new: true })
    res.json(editedBoulder);
})

app.get("/search", async (req, res) => {
    const searchName = req.query.s;
    const foundBoulders = await Boulder.find({ name: { $regex: searchName } });
    res.json(foundBoulders);
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`serving on port ${port}`)
});