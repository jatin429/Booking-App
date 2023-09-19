const { verifyToken }=require("../utils/verifyToken");

// verify user
exports.verifyUser=(req,res,next)=>{
    verifyToken(req,res,()=>{
      if(req.user.id===req.params.id || req.user.isAdmin){
        next();
      }
      else{
        return res.status(403).json({
          success:false,
          message:"you are not authorized"
        })
      }
    })
  }
  