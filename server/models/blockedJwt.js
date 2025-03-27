import mongoose from "mongoose";




let blockedJwtSchema= new mongoose.Schema({
    token:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})





export default mongoose.model("blockedToken", blockedJwtSchema)