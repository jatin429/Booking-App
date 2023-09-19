const express=require("express");
const { createHotel, updateHotel, deleteHotel, getHotel, getAllHotels, countByCity, countByType} = require("../contollers/hotel");
const { verifyAdmin } = require("../utils/verifyAdmin");

const router=express.Router();

// CREATE
router.post("/",verifyAdmin,createHotel);
// UPDATE
router.put("/:id",verifyAdmin,updateHotel);
// DELETE
router.delete("/:id",verifyAdmin,deleteHotel);
// GET
router.get("/either/:id",getHotel);
// GET ALL
router.get("/",getAllHotels);
//  count by city and count by type->whether hotel,apartment...
router.get("/countByCity",countByCity);
router.get("/countByType",countByType);

module.exports = router;