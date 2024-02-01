const mongoose = require("mongoose");
const user = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
    private: true,
  },
  email: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  likedSong: {
    type: Array,
    default: "",
  },
  likedPlaylist: {
    type: String,
    default: "",
  },
  SubscribedArtists: {
    type: String,
    default: "",
  },
});
const userModel = mongoose.model("user", user);
module.exports = userModel;
