const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Boulder = require("./models/boulderModel");
const Comment = require("./models/commentModel");

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
    const allBoulders = await Boulder.find().populate("comments");
    res.json(allBoulders);
})

app.post("/new", async (req, res) => {
    const newBoulder = { ...req.body };
    const addBoulder = new Boulder(newBoulder);
    await addBoulder.save();
    const populatedBoulder = await Boulder.populate(addBoulder, "comments")
    res.json(populatedBoulder);
})

app.delete("/", async (req, res) => {
    const { id } = req.body;
    await Boulder.findByIdAndDelete(id);
    res.send("deleted");
})

app.delete("/show/:boulderId", async (req, res) => {
    const { boulderId } = req.params;
    const { commentId } = req.body;
    const editedBoulder = await Boulder.findByIdAndUpdate(boulderId, { $pull: { comments: commentId } }, { new: true }).populate("comments");
    await Comment.findByIdAndDelete(commentId);
    res.json(editedBoulder);
})

app.get("/show/:boulderId", async (req, res) => {
    const { boulderId } = req.params;
    const foundBoulder = await Boulder.findById(boulderId).populate("comments");
    res.json(foundBoulder);
})

app.put("/", async (req, res) => {
    const boulder = { ...req.body };
    const editedBoulder = await Boulder.findByIdAndUpdate(boulder._id, boulder, { new: true }).populate("comments");
    res.json(editedBoulder);
})

app.get("/search", async (req, res) => {
    const searchName = req.query.s;
    const foundBoulders = await Boulder.find({ name: { $regex: searchName } }).populate("comments");
    res.json(foundBoulders);
})

app.put("/show/:id/add_comment", async (req, res) => {
    const { id } = req.params;
    const newComment = { title: req.body.title, body: req.body.body }
    const addComment = new Comment(newComment);
    const boulderToAddComment = await Boulder.findByIdAndUpdate(id, { $push: { comments: addComment } }, { new: true })
    await addComment.save();
    await boulderToAddComment.save();
    const populatedBoulder = await Boulder.populate(boulderToAddComment, "comments")
    res.json(populatedBoulder);
})


// app.post("/add_comment/:id", async (req, res) => {
//     const { id } = req.params;
//     const { title, body } = req.body;
//     const newComment = { title, body };
//     const addComment = new Comment(newComment);
//     const boulderToAddComment = await Boulder.findByIdAndUpdate(id, { $push: { comments: addComment } }, { new: true })
//     await addComment.save();
//     await boulderToAddComment.save();
//     res.json(addComment);
// })

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`serving on port ${port}`)
});