const express = require("express");
const passport = require("passport");
const Playlist = require("../models/Playlist");
const User = require("../models/User");
const Song = require("../models/Song");

const router = express.Router();
//create a playlist
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    const { name, thumbnail, songs } = req.body;
    const playlistData = {
      name,
      thumbnail,
      songs,
      owner: currentUser._id,
      collaborators: [],
    };
    if (!name || !thumbnail || !songs) {
      return res.status(301).json({ err: "Insufficient data" });
    }
    console.log("Created Playlist");
    const playlist = await Playlist.create(playlistData);
    return res.status(200).json(playlist);
  }
);
//get a playlist by ID
router.get(
  "/get/playlist/:playlistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const playlistId = req.params.playlistId;
    const playlist = await Playlist.findOne({ _id: playlistId }).populate({
      path: "songs",
      populate: { path: "artist" },
    });
    if (!playlist) {
      return res.status(301).json({ err: "Invalid ID" });
    }
    console.log("get playlist by playlist_Id");
    return res.status(200).json(playlist);
  }
);
//get all playlist made by me
router.get(
  "/get/me",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const artistId = req.user._id;
    const playlists = await Playlist.find({ owner: artistId }).populate(
      "owner"
    );
    console.log("get playlist by Artist_Id");
    return res.status(200).json({ data: playlists });
  }
);
//get all playlist made by an artist
router.get(
  "/get/artist/:artistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const artistId = req.params.artistId;
    //check : artist exist?
    const artist = await User.findOne({ _id: artistId });
    if (!artist) {
      return res.status(304).json({ err: "Invalid Artist ID" });
    }
    const playlists = await Playlist.find({ owner: artistId });
    console.log("get playlist by Artist_Id");
    return res.status(200).json({ data: playlists });
  }
);
// add a song to a playlist
router.post(
  "/add/song",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentuser = req.user;
    const { playlistId, songId } = req.body;
    const playlist = await Playlist.findOne({ _id: playlistId });
    if (!playlist) {
      // check if Playlist Exist
      return res.status(304).json({ err: "Playlist does not exist." });
    }
    //check if current user owns playlist or iss a collaborators
    console.log(playlist.owner);
    console.log(currentuser._id);
    console.log(playlist.owner.equals(currentuser._id));
    if (
      //JSON.stringify(playlist.owner) != JSON.stringify(currentuser._id)
      !playlist.owner.equals(currentuser._id) &&
      !playlist.Colaborators.includes(currentuser._id)
    ) {
      return res.status(400).json({ err: "Not Allowed" });
    }
    const song = await Song.findOne({ _id: songId });
    if (!song) {
      // check if Song Exist
      return res.status(304).json({ err: "Song does not exist." });
    }
    // now song playlist are valid and currentuser is either a owner or collaborators of the playlist
    // now simply addd the playlist
    playlist.songs.push(songId);
    await playlist.save();
    console.log("Add song in a playlist ");
    return res.status(200).json(playlist);
  }
);

module.exports = router;
