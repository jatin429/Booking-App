const Hotel = require("../models/Hotel");

// CREATE
exports.createHotel=async(req,res)=>{
    const newHotel=await Hotel(req.body);

    try{
        const savedHotel=await newHotel.save();
        res.status(200).json(savedHotel);
    }
    catch(err){
      res.status(500).json({
       success:false,
       message:"Problem occured while creating hotel"  
      })
    }
}
// UPDATE
exports.updateHotel=async(req,res)=>{
    try{
        const updatedHotel=await Hotel.findByIdAndUpdate(req.params.id,{ $set:req.body},{new:true})
        res.status(200).json(updatedHotel)
    }
    catch(err){
      res.status(500).json({
       success:false,
       message:"Problem occured while updation"  
      })
    }
}

// DELETE 
exports.deleteHotel=async(req,res)=>{
    try{
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json({
           success:true,
           message:"Hotel Deleted successfully"
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
exports.getHotel=async(req,res)=>{
    try{
        const hotel=await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    }
    catch(err){
      res.status(500).json({
       success:false,
       message:"Problem occured while getting a hotel"  
      })
    }
}
// GET ALL HOTELS
exports.getAllHotels=async(req,res)=>{
  const {min,max, ...others}=req.query
    try{
        const query={...others,
          cheapestPrice:{$gt:min||1,$lt:max ||999}}
          // .limit(req.query.limit)
        const hotels=await Hotel.find(query).sort({cheapestPrice:1});
        res.status(200).json(hotels);
    }
    catch(err){
      res.status(500).json({
       success:false,
       message:"Problem occured while getting all hotels"  
      })
    }
}
// count by city
exports.countByCity=async(req,res)=>{
  const cities=req.query.cities.split(",")
  try{
      const list=await Promise.all(cities.map(city=>(
        Hotel.countDocuments({city:city})
      )))
      res.status(200).json(list);
  }
  catch(err){
    res.status(500).json({
     success:false,
     message:"Problem occured while getting count of all hotels"  
    })
  }
}
// count by type
// exports.countByType = async (req, res) => {
//   try {
//     const hotelCount = await Hotel.countDocuments({ type: "hotel" });
//     const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
//     const resortCount = await Hotel.countDocuments({ type: "resort" });
//     const villaCount = await Hotel.countDocuments({ type: "villa" });
//     const cabinCount = await Hotel.countDocuments({ type: "cabin" });

//     res.status(200).json([
//       { type: "hotel", count: hotelCount },
//       { type: "apartments", count: apartmentCount },
//       { type: "resorts", count: resortCount },
//       { type: "villas", count: villaCount },
//       { type: "cabins", count: cabinCount },
//     ]);
//   } catch(err){
//     res.status(500).json({
//      success:false,
//      message:"Problem occured while getting count type of all "  
//     })
//   }
// };

exports.countByType=async(req,res)=>{
  const types=req.query.types.split(",")
  try{
      const list=await Promise.all(types.map(type=>(
        Hotel.countDocuments({type:type})
      )))
      res.status(200).json(list);
  }
  catch(err){
    res.status(500).json({
     success:false,
     message:"Problem occured while getting count of all types"  
    })
  }
}

// getAllHotelrooms
exports.getHotelRooms=async(req,res)=>{
 try{
    const hotel= await Hotel.findById(req.params.id);
    const list=await Promise.all(hotel.rooms.map((room)=>{
      return Room.findById(room);
    }))
    res.status(200).json(list);

 }catch(err){
    res.status(500).json({
     success:false,
     message:err.message
    })
 }
}
