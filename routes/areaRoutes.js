const express = require("express");
const router = express.Router();

const {
    getAreas,
    getOneArea,
    addArea,
    deleteArea
} = require("../controllers/areasController");


router.route("/")
    .get(getAreas)
    .delete(deleteArea)

router.route("/show/:areaId")
    .get(getOneArea)

router.route("/new")
    .post(addArea)

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