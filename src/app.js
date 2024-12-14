const path = require("path");
const oracledb = require("oracledb");
const express = require("express");
const sessions = require("express-session");
const ejsLint = require("ejs-lint");
const cookieParser = require("cookie-parser");



const appRouter = require("../routers/appRouter");
const database = require("../DB_codes/database");
const session = require("express-session");
const app = express();

const publicPath = path.join(__dirname, "../public/");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "ejs");
app.set("views", viewsPath);


const oneDay = 1000 * 60 * 60 * 24;
app.use(
  sessions({
    secret: "thisismysecrctekey789",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);




app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicPath));
app.use(cookieParser());
app.use(appRouter);

const port = 3000;

app.listen(port, async () => {
  try {
  
    await database.startup();

    console.log(`Server started on ${port}`);
  } catch (error) {
    console.log("Error starting the database");
    process.exit(1);
  }
});
