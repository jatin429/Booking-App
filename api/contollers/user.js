const User = require("../models/User");

// UPDATE
exports.updateUser=async(req,res)=>{
    try{
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{ $set:req.body},{new:true})
        res.status(200).json(updatedUser);
    }
    catch(err){
      res.status(500).json({
       success:false,
       message:"Problem occured while updation"  
      })
    }
}

// DELETE 
exports.deleteUser=async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
           success:true,
           message:"User Deleted successfully"
        })
    }
    catch(err){
      res.status(500).json({
       success:false,
       message:"Problem occured while deleting"  
      })
    }
}
// GET
exports.getUser=async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        res.status(200).json(user)
    }
    catch(err){
      res.status(500).json({
       success:false,
       message:"Problem occured while getting a User"  
      })
    }
}
// GET ALL User
exports.getAllUser=async(req,res)=>{
    try{
        const users=await Users.find()
        res.status(200).json(users);
    }
    catch(err){
      res.status(500).json({
       success:false,
       message:"Problem occured while getting all User"  
      })
    }
}
