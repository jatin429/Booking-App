const jwt=require("jsonwebtoken");
require("dotenv").config();

// verify authentication
exports.verifyToken=(req,res,next)=>{
  const token=req.cookies.access_token;
  if(!token){
    return res.status(401).json({
        sucess:false,
        message:"you are not authenticated!"
    })
  }
  jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
   if(err){
      return res.status(403).json({
        success:false,
        message:"Token is not valid"
      })
   }
   req.user=user;
   next();
})   
}



