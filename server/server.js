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
const boulderRoutes = require("./routes/boulderRoutes");
const userRoutes = require("./routes/userRoutes");

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


// app.use((req, res, next) => {
//     console.log("req.session: ", req.session);
//     next();
// })

app.use("/", boulderRoutes);
app.use("/", userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`serving on port ${port}`)
});