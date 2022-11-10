const express = require("express");
require("dotenv").config();
const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");
const { validateMovie, validateUser } = require("./validators.js");

const port = process.env.APP_PORT ?? 5000;

const app = express();


app.use(express.json());

//const port = 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);

app.post("/api/movies", movieHandlers.postMovie);
app.post("/api/users", userHandlers.postUser);

app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.post("/api/users", validateUser, userHandlers.postUser);

app.put("/api/movies/:id", validateMovie, movieHandlers.putMovie);
app.put("/api/users/:id", validateUser, userHandlers.putUser);




app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});


const step1 = (req, res, next) => {
  req.message = "I went through step1";
  next();
};

const step2 = (req, res, next) => {
  req.message += " and step2";
  next();
};

const lastStep = (req, res) => {
  res.send(req.message);
};

app.get("/justToTest", step1, step2, lastStep);