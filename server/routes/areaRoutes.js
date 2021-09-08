const express = require("express");
const router = express.Router();

const {
    getAreas
} = require("../controllers/areasController");


router.route("/")
    .get(getAreas)


// router.route("/")
//     .get(getAllBoulders)
//     .delete(deleteBoulder)

// router.route("/new")
//     .post(addNewBoulder)

// router.route("/edit/:id")
//     .put(editBoulder)

// router.route("/show/:boulderId")
//     .get(showBoulder)
//     .delete(deleteBoulderComment)

// router.route("/search")
//     .get(searchBoulders)

// router.route("/show/:id/add_comment")
//     .put(addComment)

module.exports = router;