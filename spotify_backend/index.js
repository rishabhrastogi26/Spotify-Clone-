const express = require("express");
const mongoose = require("mongoose");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const User = require("./models/User");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");

require("dotenv").config();
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json()); //convey node to convert a req.body to a json file .

mongoose
  .connect(
    "mongodb+srv://Admin:" +
      process.env.pass_mongo +
      "@cluster.qiuzyne.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((x) => {
    console.log("cluster db connected ");
  })
  .catch((err) => {
    console.log("erroe" + err);
  });

//Passport-JWT
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.key1;
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      //console.log("jwt_payload", jwt_payload);
      const user = await User.findOne({ _id: jwt_payload.identifier });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/auth", authRoutes);
app.use("/song", songRoutes);
app.use("/playlist", playlistRoutes);

app.listen(port, () => {
  console.log("App is running on port :" + port);
});
