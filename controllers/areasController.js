const Area = require("../models/areaModel");
const Boulder = require("../models/boulderModel");
const User = require("../models/userModel");
const ErrorResponse = require("../utils/ErrorResponse");



// const createone = async () => {
//     await Area.deleteMany({});
//     const test = new Area({
//         name: "carver",
//         path: [],
//         boulders: [],
//         parent: null
//     })
//     const test2 = new Area({
//         name: "main forest",
//         path: [test],
//         boulders: [],
//         parent: test
//     })
//     const test3 = new Area({
//         name: "testing 3rd layer",
//         path: [...test2.path, test2],
//         boulders: [],
//         parent: test2
//     })
//     await test.save();
//     await test2.save();
//     await test3.save();
// }

// createone();


exports.getAreas = async (req, res, next) => {
    try {
        const allAreas = await Area.find()
            .populate("boulders", ["name", "grade"])
            .populate("path", ["name"])
            .populate("parent", ["name"])
            .populate("author", ["_id", "username"])
        res.json({ success: true, areas: allAreas });
    } catch (e) {
        next(e);
    }
}

exports.getOneArea = async (req, res, next) => {
    try {
        const { areaId } = req.params;
        const foundArea = await Area.findById(areaId)
            .populate("boulders")
            .populate("path", ["name"])
            .populate("parent", ["name"])
            .populate("author", ["_id", "username"])
        if (!foundArea) {
            return next(new ErrorResponse("could not find area", 404));
        }
        res.json({ success: true, area: foundArea });
    } catch (e) {
        next(e);
    }
}

exports.addArea = async (req, res, next) => {
    try {
        const { name, description, boulders, path, parent, userId } = req.body;

        const foundUser = await User.findById(userId);
        // create a new area
        const newArea = new Area({ name, description, boulders, path, parent, author: foundUser });
        await newArea.save();

        const populatedArea = await Area.findById(newArea._id)
            .populate("boulders")
            .populate("path", ["name"])
            .populate("parent", ["name"])
            .populate("author", ["_id", "username"])
        res.json({ success: true, area: populatedArea });

    } catch (e) {
        next(e);
    }
}

exports.deleteArea = async (req, res, next) => {
    try {
        const { id } = req.body;
        const area = await Area.findById(id);
        const areaDescendents = await Area.find({ path: area._id })
            .populate("boulders")
            .populate("path", ["name"])
            .populate("parent", ["name"])


        // delete all boulders of selected area
        await Boulder.deleteMany({ _id: { $in: area.boulders } });
        // delete selected area
        await Area.deleteOne({ _id: area._id });

        if (areaDescendents.length > 0) {
            for (let a of areaDescendents) {
                // delete all boulders in the sub area
                await Boulder.deleteMany({ _id: { $in: a.boulders } });
                // delete the area itself
                await Area.deleteOne({ _id: a._id });
            }
        }
        // if area has no descendents, send back just the area
        res.json({ success: true, area, descendents: areaDescendents });
    } catch (e) {
        next(e);
    }
}

