const express=require("express");
const { createRoom, updateRoom, deleteRoom, getRoom, getAllRooms,updateRoomAvalibility } = require("../contollers/room");
const { verifyAdmin } = require("../utils/verifyAdmin");

const router=express.Router();


// CREATE
router.post("/:hotelid",verifyAdmin,createRoom);
// UPDATE
router.put("/:id",verifyAdmin,updateRoom);
router.put("/avalibility/:id",updateRoomAvalibility);
// DELETE
router.delete("/:id/:hotelid",verifyAdmin,deleteRoom);
// GET
router.get("/:id",getRoom);
// GET ALL
router.get("/",verifyAdmin,getAllRooms);


module.exports = router;