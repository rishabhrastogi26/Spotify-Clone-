const mongoose = require("mongoose");
const playlist =  new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    thumbnail:{ //image url
        type:String,
        required:true, 
    },
    songs:[{
        type:mongoose.Types.ObjectId,
        ref:"song",
        
    }],
    Colaborators:[{
        type:mongoose.Types.ObjectId,
        ref:"user",
    }],
    owner:{
        type:mongoose.Types.ObjectId,//getting the id of user id in this table 
        ref:"user",
    }
});
const playlistModel= mongoose.model("playlist",playlist);
module.exports= playlistModel;