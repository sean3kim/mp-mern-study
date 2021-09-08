const Area = require("../models/areaModel");
const User = require("../models/userModel");
const ErrorResponse = require("../utils/ErrorResponse");



const createone = async () => {
    await Area.deleteMany({});
    const test = new Area({
        name: "carver",
        path: [],
        boulders: [],
        parent: null
    })
    const test2 = new Area({
        name: "main forest",
        path: [test],
        boulders: [],
        parent: test
    })
    await test.save();
    await test2.save();
}

createone();


exports.getAreas = async (req, res) => {
    const allAreas = await Area.find();
    console.log("all areas: ", allAreas)
    res.json({ success: true, areas: allAreas });
}

exports.addArea = async (req, res, next) => {
    try {
        // destructure from front end form
        //  need the area's location, userid
    } catch (e) {

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
