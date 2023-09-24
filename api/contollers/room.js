const Room=require("../models/Room");
const Hotel=require("../models/Hotel")

// CREATE ROOM
exports.createRoom=async(req,res)=>{
    const hotelid=req.params.hotelid
    const newRoom=await Room(req.body);
    try{
      const savedRoom=await newRoom.save();
    //   update hotel room
    try{
        await Hotel.findByIdAndUpdate(hotelid,{$push:{rooms:savedRoom._id}});
    } catch(err){
        res.status(500).json({
         success:false,
         message:"Problem occured while updating hotel room"  
        })
      }
      res.status(200).json(savedRoom);
    }
    catch(err){
        res.status(500).json({
         success:false,
         message:"Problem occured while creating room"  
        })
      }
}

// UPDATE
exports.updateRoom=async(req,res)=>{
    try{
        const updatedRoom=await Room.findByIdAndUpdate(req.params.id,{ $set:req.body},{new:true})
        res.status(200).json(updatedRoom)
    }
    catch(err){
      res.status(500).json({
       success:false,
       message:"Problem occured while updation"  
      })
    }
}
// UPDATE Avalibility
exports.updateRoomAvalibility=async(req,res)=>{
    try{
      const updateRoomAvalibility=await Room.updateOne(
          {"roomNumber._id":req.params.id},
          {
            $push:{
              "roomNumber.$.unavailableDates": req.body.dates
            },
          }
          )
          res.status(200).json(updateRoomAvalibility);
    }
    catch(err){
      res.status(500).json({
       success:false,
       message:"Problem occured while updation unavaliable dates"  
      })
    }
}


// DELETE 
exports.deleteRoom=async(req,res)=>{
  const hotelid=req.params.hotelid
    try{
        await Room.findByIdAndDelete(req.params.id);
        try{
          await Hotel.findByIdAndUpdate(hotelid,{$pull:{rooms:req.params.id},});
      } catch(err){
          res.status(500).json({
           success:false,
           message:"Problem occured while updating hotel room"  
          })
        }
        res.status(200).json({
           success:true,
           message:"Room Deleted successfully"
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
exports.getRoom=async(req,res)=>{
    try{
        const room=await Room.findById(req.params.id)
        res.status(200).json(room)
    }
    catch(err){
      res.status(500).json({
       success:false,
       message:"Problem occured while getting a room info"  
      })
    }
}
// GET ALL ROOMS
exports.getAllRooms=async(req,res)=>{
    try{
        const rooms=await Room.find()
        res.status(200).json(rooms);
    }
    catch(err){
      res.status(500).json({
       success:false,
       message:"Problem occured while getting all rooms info"  
      })
    }
}
