require("dotenv").config({ path: "../.env" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo")
const boulderRoutes = require("./routes/boulderRoutes");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

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
app.use(cookieParser());

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

app.use("/", boulderRoutes);
app.use("/", userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`serving on port ${port}`)
});