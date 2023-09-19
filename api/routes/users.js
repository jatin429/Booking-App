const express=require("express");
const { updateUser, deleteUser, getUser, getAllUser } = require("../contollers/user");
const { verifyAdmin} = require("../utils/verifyAdmin");
const { verifyUser } = require("../utils/verifyUser");

const router=express.Router();

// // verify user
// router.get("/checkauth",verifyToken,(req,res)=>{
//     res.send("hello user,you are logged in");
// })

// UPDATE
router.put("/:id",verifyUser,updateUser);
// DELETE
router.delete("/:id",verifyUser,deleteUser);
// GET
router.get("/:id",getUser);
// GET ALL
router.get("/",verifyAdmin,getAllUser);


module.exports = router;