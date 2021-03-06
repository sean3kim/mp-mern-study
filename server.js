if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "./.env" });
}

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
const boulderRoutes = require("./routes/boulderRoutes");
const userRoutes = require("./routes/userRoutes");
const areaRoutes = require("./routes/areaRoutes");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorHandler.js");

const app = express();
// if (process.env.NODE_ENV === "production") {
// app.use(express.static("client/build"));
// app.use(express.static(path.join(__dirname, 'client/build')));
// }
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
// app.use(cors({ credentials: true, origin: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());

const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,      // this is a week
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
    store: MongoStore.create({
        mongoUrl: dbURL,
        secret: process.env.SESSION_SECRET,
        touchAfter: 24 * 60 * 60
    })
}
app.use(session(sessionConfig))


// TRY MOVING THESE TO /api/
// noticed that pages with a get that matches the url is returning just the server data and is displayed on website
app.use("/api", boulderRoutes);
app.use("/api", userRoutes);
app.use("/api/areas", areaRoutes);

// app.use(express.static(path.join(__dirname, 'client/build')));
// app.get("*", (req, res) => {
//     console.log("didn't find path");
//     res.sendFile(path.join(__dirname, "client/build", "index.html"))
// })

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`serving on port ${port}`)
});