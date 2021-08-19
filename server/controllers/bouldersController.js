const Boulder = require("../models/boulderModel");
const Comment = require("../models/commentModel");
const ErrorResponse = require("../utils/ErrorResponse");

exports.getAllBoulders = async (req, res) => {
    const allBoulders = await Boulder.find().populate("comments");
    res.json(allBoulders);
}

exports.deleteBoulder = async (req, res, next) => {
    try {
        const { id } = req.body;
        await Boulder.findByIdAndDelete(id);
        res.send("deleted");
    } catch (e) {
        next(e)
    }
}

exports.addNewBoulder = async (req, res, next) => {
    try {
        const newBoulder = { ...req.body };
        const addBoulder = new Boulder(newBoulder);
        await addBoulder.save();
        const populatedBoulder = await Boulder.populate(addBoulder, "comments")
        res.json(populatedBoulder);
    } catch (e) {
        next(e)
    }
}


exports.showBoulder = async (req, res, next) => {
    try {
        const { boulderId } = req.params;
        const foundBoulder = await Boulder.findById(boulderId).populate("comments");
        if (!foundBoulder) {
            return next(new ErrorResponse("could not find boulder", 404))
        }
        res.json(foundBoulder);
    } catch (e) {
        next(e);
    }
}

exports.deleteBoulderComment = async (req, res, next) => {
    try {
        const { boulderId } = req.params;
        const { commentId } = req.body;
        const editedBoulder = await Boulder.findByIdAndUpdate(boulderId, { $pull: { comments: commentId } }, { new: true }).populate("comments");
        await Comment.findByIdAndDelete(commentId);
        res.json(editedBoulder);
    } catch (e) {
        next(e);
    }
}


exports.editBoulder = async (req, res, next) => {
    try {
        const boulder = { ...req.body };
        const editedBoulder = await Boulder.findByIdAndUpdate(boulder._id, boulder, { new: true }).populate("comments");
        if (!editedBoulder) {
            return next(new ErrorResponse("could not find boulder", 404))
        }
        res.json(editedBoulder);
    } catch (e) {
        next(e);
    }
}

exports.searchBoulders = async (req, res) => {
    const searchName = req.query.s;
    const foundBoulders = await Boulder.find({ name: { $regex: searchName } }).populate("comments");
    res.json(foundBoulders);
}

exports.addComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, body } = req.body;
        if (!title || !body) {
            return next(new ErrorResponse("please provide title and comment body", 400))
        }

        const newComment = { title, body }
        const addComment = new Comment(newComment);
        const boulderToAddComment = await Boulder.findByIdAndUpdate(id, { $push: { comments: addComment } }, { new: true })
        if (!boulderToAddComment) {
            return next(new ErrorResponse("could not find boulder", 404))
        }

        await addComment.save();
        await boulderToAddComment.save();
        const populatedBoulder = await Boulder.populate(boulderToAddComment, "comments")
        res.json(populatedBoulder);
    } catch (e) {
        next(e);
    }
}