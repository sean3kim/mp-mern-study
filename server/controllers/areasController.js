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
        const { name, boulders, path, parent } = req.body;

        // create a new area
        const newArea = new Area({ name, boulders, path, parent });
        await newArea.save();

        const populatedArea = await Area.findById(newArea._id)
            .populate("boulders")
            .populate("path", ["name"])
            .populate("parent", ["name"])
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

// exports.addNewBoulder = async (req, res, next) => {
//     try {
//         const { name, grade, location, description, tags, userId } = req.body;
//         const foundUser = await User.findById(userId);
//         const newBoulder = { name, grade, location, description, tags, user: foundUser };
//         const addBoulder = new Boulder(newBoulder);

//         // trying to add the boulder to the user without having to findbyidandupdate again
//         if (!foundUser) {
//             console.log("didnt find user");
//             return next(new ErrorResponse("please login", 401));
//         }
//         foundUser.boulder.push(addBoulder);
//         await addBoulder.save();
//         await foundUser.save();
//         // await foundUserAgain.save();
//         const populatedBoulder = await Boulder.findById(addBoulder._id)
//             .populate({ path: "comments", populate: { path: "author", select: "username" } })
//             .populate("user", ["_id", "username"]);
//         res.json({
//             success: true,
//             boulder: populatedBoulder
//         });
//     } catch (e) {
//         console.log(e.message)
//         next(e)
//     }
// }
