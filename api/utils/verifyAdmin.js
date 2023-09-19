const { verifyToken }=require("../utils/verifyToken");

// verify admin
exports.verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
    if(req.user.isAdmin){
      next();
    }
    else{
      return res.status(403).json({
        success:false,
        message:"you are not Admin"
      })
    }
  })
}
