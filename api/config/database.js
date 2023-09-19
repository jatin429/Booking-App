const mongoose=require("mongoose");
require("dotenv").config();

exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>console.log("DB Connection Successfully"))
    .catch((e)=>{
            console.log("DB connection failed"),
            console.error(e);
            process.exit(1);
    })
};