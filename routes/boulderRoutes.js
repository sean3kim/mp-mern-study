const express = require("express");
const router = express.Router();

const {
    getAllBoulders,
    deleteBoulder,
    addNewBoulder,
    showBoulder,
    deleteBoulderComment,
    editBoulder,
    searchBoulders,
    addComment,
} = require("../controllers/bouldersController");


router.route("/")
    .get(getAllBoulders)
    .delete(deleteBoulder)

router.route("/new")
    .post(addNewBoulder)

router.route("/edit/:id")
    .put(editBoulder)

router.route("/show/:boulderId")
    .get(showBoulder)
    .delete(deleteBoulderComment)

router.route("/search")
    .get(searchBoulders)

router.route("/show/:id/add_comment")
    .put(addComment)

module.exports = router;