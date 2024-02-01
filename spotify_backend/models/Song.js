const mongoose = require("mongoose");
const song = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  thumbnail: {
    //image url
    type: String,
    required: true,
  },
  track: {
    type: String,
    default: "",
  },
  artist: {
    type: mongoose.Types.ObjectId, //getting the id of user id in this table mongoose.Type.objectId
    ref: "user",
  },
});
const songModel = mongoose.model("song", song);
module.exports = songModel;
