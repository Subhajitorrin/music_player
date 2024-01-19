const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = 3000;

// view engine ejs
app.set("view engine", "ejs");

// static files in public folder
const staticFilePath = path.join(__dirname, "/public");
app.use(express.static(staticFilePath));

// connect to mongodb
mongoose
  .connect(
    "mongodb+srv://orrin2op:RhQZLEvdtcaDR8P6@cluster0.f7bdlrn.mongodb.net/songs"
  )
  .then(() => {
    console.log("Mongodb is connected");
  });
// define schema
const iconsSchema = new mongoose.Schema({
  link: {
    type: String,
  },
  artist: {
    type: String,
  },
  code: {
    type: String,
  },
});
const songsSchema = new mongoose.Schema({
  artist: {
    type: String,
  },
  link: {
    type: String,
  },
  name: {
    type: String,
  },
  id: {
    type: String,
  },
});
// create model
const icons = mongoose.model("icons", iconsSchema);
const songs = mongoose.model("songs", songsSchema);

// get routes
let iconsList = [];
app.get("/", async (req, res) => {
  iconsList = await icons.find({});
  let songsList = 0;
  res.render("index", { iconsList, songsList });
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  const songsList = await songs.find({ id: id });
  res.render("index", { iconsList, songsList });
});

// listen
app.listen(PORT, () => {
  console.log(`server live at http://localhost:${PORT}`);
});

// hamburgur menu
