const Boulder = require("../models/boulderModel");
const Comment = require("../models/commentModel");

exports.getAllBoulders = async (req, res) => {
    const allBoulders = await Boulder.find().populate("comments");
    res.json(allBoulders);
}

exports.deleteBoulder = async (req, res) => {
    const { id } = req.body;
    await Boulder.findByIdAndDelete(id);
    res.send("deleted");
}

exports.addNewBoulder = async (req, res) => {
    const newBoulder = { ...req.body };
    const addBoulder = new Boulder(newBoulder);
    await addBoulder.save();
    const populatedBoulder = await Boulder.populate(addBoulder, "comments")
    res.json(populatedBoulder);
}


exports.showBoulder = async (req, res) => {
    const { boulderId } = req.params;
    const foundBoulder = await Boulder.findById(boulderId).populate("comments");
    res.json(foundBoulder);
}

exports.deleteBoulderComment = async (req, res) => {
    const { boulderId } = req.params;
    const { commentId } = req.body;
    const editedBoulder = await Boulder.findByIdAndUpdate(boulderId, { $pull: { comments: commentId } }, { new: true }).populate("comments");
    await Comment.findByIdAndDelete(commentId);
    res.json(editedBoulder);
}


exports.editBoulder = async (req, res) => {
    const boulder = { ...req.body };
    const editedBoulder = await Boulder.findByIdAndUpdate(boulder._id, boulder, { new: true }).populate("comments");
    res.json(editedBoulder);
}

exports.searchBoulders = async (req, res) => {
    const searchName = req.query.s;
    const foundBoulders = await Boulder.find({ name: { $regex: searchName } }).populate("comments");
    res.json(foundBoulders);
}

exports.addComment = async (req, res) => {
    const { id } = req.params;
    const newComment = { title: req.body.title, body: req.body.body }
    const addComment = new Comment(newComment);
    const boulderToAddComment = await Boulder.findByIdAndUpdate(id, { $push: { comments: addComment } }, { new: true })
    await addComment.save();
    await boulderToAddComment.save();
    const populatedBoulder = await Boulder.populate(boulderToAddComment, "comments")
    res.json(populatedBoulder);
}