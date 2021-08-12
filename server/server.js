const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const MongoStore = require("connect-mongo")
const Boulder = require("./models/boulderModel");
const Comment = require("./models/commentModel");
const User = require("./models/userModel");

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
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

const sessionConfig = {
    secret: "seankim",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,      // this is a week
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
    store: MongoStore.create({
        mongoUrl: dbURL,
        secret: "seankim",
        touchAfter: 24 * 60 * 60
    })
}
app.use(session(sessionConfig))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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

app.put("/edit/:id", async (req, res) => {
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


app.post("/register", async (req, res) => {
    const { username, password, email } = req.body;
    const user = new User({ username, password, email });
    const registeredUser = await User.register(user, password);
    res.json(registeredUser)
})

app.post("/login", passport.authenticate("local"), async (req, res) => {
    res.cookie("name", "sean")
    res.send(true);
})


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`serving on port ${port}`)
});