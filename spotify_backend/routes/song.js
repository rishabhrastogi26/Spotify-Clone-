const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../models/Song");
const User = require("../models/User");
//creating a new a song
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { name, thumbnail, track } = req.body;

    if (!name || !thumbnail || !track) {
      return res
        .status(301)
        .json({ err: "Insufficient details to create song." });
    }
    const artist = req.user._id;
    const songDetails = { name, thumbnail, track, artist };
    const createdSong = await Song.create(songDetails);
    console.log("creating new Song");
    return res.status(200).json(createdSong);
  }
);

//get all song that I have published
router.get(
  "/get/mysongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const songs = await Song.find({ artist: req.user._id }).populate("artist");
    console.log("get all MY_Song");
    return res.status(200).json({ data: songs });
  }
);
//get all song of an artist like all song of YOYO HONEY SINGH.
router.get(
  "/get/artist/:artistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { artistId } = req.params;
    //if artist dont exist
    const artist = await User.find({ _Id: artistId });
    //this check is not working
    console.log(artist);
    if (!artist) {
      return res.status(301).json({ err: "Artist does not exist." });
    }
    const songs = await Song.find({ artist: artistId });
    console.log("get song by artist Id");
    return res.status(200).json({ data: songs });
  }
);
//get single song by its name
router.get(
  "/get/songname/:songName",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { songName } = req.params;
    //dbskfbhuliaswgbnlsbfl
    const songs = await Song.find({ name: songName }).populate("artist");
    console.log("get Song by its name ");
    return res.status(200).json({ data: songs });
  }
);
module.exports = router;
