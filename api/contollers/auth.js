const User = require("../models/User")
const bcrypt=require("bcrypt");
require("dotenv").config()
const jwt=require("jsonwebtoken");

//  NEW USER
exports.register=async(req,res)=>{
   try{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password,salt);
  const newUser=await User({
    ...req.body,
    password:hash

  })
  await newUser.save();
  res.status(200).send("user has been created");
}catch(err){
   res.status(500).json({
    success:false,
    message:"problem while creating new user"
   })
}
}

// LOGIN
exports.login=async(req,res)=>{
  try{
 const user=await User.findOne({username:req.body.username});
 if(!user) return res.status(404).send("user not found!");

 const isPasswordCorrect=await bcrypt.compare(req.body.password,user.password);
 if(!isPasswordCorrect) return res.status(404).send("Wrong password!");

 const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRET)
 
 res.cookie("access_token",token,{
  httpOnly:true,  
 }).status(200).json(user); 
}catch(err){
  res.status(500).json({
   success:false,
   message:"problem while login"
  })
}
}