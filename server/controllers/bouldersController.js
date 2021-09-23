const Boulder = require("../models/boulderModel");
const Comment = require("../models/commentModel");
const User = require("../models/userModel");
const Area = require("../models/areaModel");
const ErrorResponse = require("../utils/ErrorResponse");

exports.getAllBoulders = async (req, res) => {
    const allBoulders = await Boulder.find()
        .populate({ path: "comments", populate: { path: "author", select: "username" } })
        .populate("user", ["_id", "username"]);
    res.json(allBoulders);
}

exports.deleteBoulder = async (req, res, next) => {
    try {
        const { id } = req.body;
        const foundBoulder = await Boulder.findById(id);
        // deleting all the comments that the boulder had
        await Comment.deleteMany({ _id: { $in: foundBoulder.comments } })
        // deleting the boulder from the user document
        await User.findByIdAndUpdate(foundBoulder.user, { $pull: { boulder: foundBoulder._id } })
        // finally deleting the boulder itself
        await Boulder.findByIdAndDelete(id);
        res.send({ success: true, boulder: foundBoulder });
    } catch (e) {
        next(e)
    }
}

exports.addNewBoulder = async (req, res, next) => {
    try {
        const { name, grade, location, description, tags, userId, area } = req.body;
        const foundUser = await User.findById(userId);
        const foundArea = await Area.findById(area._id);
        const newBoulder = { name, grade, location, description, tags, user: foundUser };
        const addBoulder = new Boulder(newBoulder);

        // trying to add the boulder to the user without having to findbyidandupdate again
        if (!foundUser) {
            console.log("didnt find user");
            return next(new ErrorResponse("please login", 401));
        }
        foundUser.boulder.push(addBoulder);
        foundArea.boulders.push(addBoulder);
        await addBoulder.save();
        await foundArea.save();
        await foundUser.save();
        // await foundUserAgain.save();
        const populatedBoulder = await Boulder.findById(addBoulder._id)
            .populate({ path: "comments", populate: { path: "author", select: "username" } })
            .populate("user", ["_id", "username"]);
        res.json({
            success: true,
            boulder: populatedBoulder,
            areaId: foundArea._id
        });
    } catch (e) {
        console.log(e.message)
        next(e)
    }
}


exports.showBoulder = async (req, res, next) => {
    try {
        const { boulderId } = req.params;
        const foundBoulder = await Boulder.findById(boulderId)
            .populate({ path: "comments", populate: { path: "author", select: "username" } })
            .populate("user", ["_id", "username", "boulders"]);
        if (!foundBoulder) {
            return next(new ErrorResponse("could not find boulder", 404))
        }
        res.json({ success: true, boulder: foundBoulder });
    } catch (e) {
        next(e);
    }
}

exports.deleteBoulderComment = async (req, res, next) => {
    try {
        const { boulderId } = req.params;
        const { commentId, userId } = req.body;
        // delete comment from boulder and user
        const editedUser = await User.findByIdAndUpdate(userId, { $pull: { comments: commentId } }, { new: true });
        const editedBoulder = await Boulder.findByIdAndUpdate(boulderId, { $pull: { comments: commentId } }, { new: true })
            .populate({ path: "comments", populate: { path: "author", select: "username" } })
        await Comment.findByIdAndDelete(commentId);
        res.json({ success: true, boulder: editedBoulder, commentId });
    } catch (e) {
        next(e);
    }
}


exports.editBoulder = async (req, res, next) => {
    try {
        // need to find the user and add boulder? yes/no? i don't think so bc id is the same and that is all that is stored
        const boulder = { ...req.body };
        if (!boulder.name || !boulder.grade || !boulder.location) {
            return next(new ErrorResponse("please provide name, grade, and location", 400))
        }
        const editedBoulder = await Boulder.findByIdAndUpdate(boulder._id, boulder, { new: true })
            .populate({ path: "comments", populate: { path: "author", select: "username" } })
            .populate("user", ["_id", "username"]);
        if (!editedBoulder) {
            return next(new ErrorResponse("could not find boulder", 404))
        }
        res.json({ success: true, boulder: editedBoulder });
    } catch (e) {
        next(e);
    }
}

exports.searchBoulders = async (req, res) => {
    const searchName = req.query.s;
    const foundBoulders = await Boulder.find({ name: { $regex: searchName } })
        .populate({ path: "comments", populate: { path: "author", select: "username" } })
        .populate("user", ["_id", "username"]);
    res.json(foundBoulders);
}

exports.addComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, body } = req.body.comment;
        const { userId } = req.body;
        if (!title || !body) {
            return next(new ErrorResponse("please provide title and comment body", 400))
        }

        const newComment = { title, body }
        const addComment = new Comment(newComment);
        const foundUser = await User.findByIdAndUpdate(userId, { $push: { comments: addComment } }, { new: true });
        addComment.author = foundUser._id;
        const boulderToAddComment = await Boulder.findByIdAndUpdate(id, { $push: { comments: addComment } }, { new: true })
        if (!boulderToAddComment) {
            return next(new ErrorResponse("could not find boulder", 404))
        }


        // also need to add comment to user


        await addComment.save();
        await boulderToAddComment.save();
        await foundUser.save();
        const populatedBoulder = await Boulder.findById(boulderToAddComment._id)
            .populate({ path: "comments", populate: { path: "author", select: "username" } })
            .populate("user", ["_id", "username"])
        res.json({ success: true, boulder: populatedBoulder, comment: addComment });
    } catch (e) {
        next(e);
    }
}