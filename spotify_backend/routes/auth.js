const express = require("express");
const bcrypt = require("bcrypt"); //generation of hash value
const router = express.Router();
const User = require("../models/User");
const { getToken } = require("../utils/helpers");

//for sign up /register to the app 
router.post("/register", async (req, res) => {
  //req.bodywill be of the format of (firstname,lastname,email,username,password)
  const { email, password, firstName, lastName, userName } = req.body;// here body is in json 
  //check user exist?
  const user = await User.findOne({ email: email });
  if (user) {
    // if user exists
    return res
      .status(403)//the server understands the request but refuses to authorize it
      .json({ error: "A user with this email already exists" });
  }
  //if dont exist (valid user : sign up: create a new user in DB)
  //hashing password
  const hashedpassword = await bcrypt.hash(password, 10);
  const newUserData = {
    email,
    password: hashedpassword,
    firstName,
    lastName,
    userName,
  }; // basic security measure :never store password DB(plaintext->hash)
  const newUser = await User.create(newUserData);
  //create a token for the new user
  const token = await getToken(email, newUser);
  //return result to user
  const userToReturn = { ...newUser.toJSON(), token };
  delete userToReturn.password; //security measure
  console.log("register");
  return res.status(200).json(userToReturn);
});

router.post("/login",async(req,res)=>{
  //getting email and password from the request
  const {email,password}=req.body;
  //check if the email is in the db 
  const user= await User.findOne({email:email});
  if (!user)
  {
    return res.status(403).json({err:"Invalid Email credentials"});
  }
  //check for password catch in the notes.
  console.log(user);
  const isPasswordValid= await bcrypt.compare(password,user.password);
  if(!isPasswordValid)
  {
    return res.status(403).json({err:"Invalid Password Credential"});
  }
  //if a valid login 
  const token =await getToken(user.email,user);
  const userToReturn = { ...user.toJSON(), token };
  delete userToReturn.password; //security measure
  console.log("login");
  return res.status(200).json(userToReturn);
});
module.exports=router;