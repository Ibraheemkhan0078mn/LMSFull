import mongoose from "mongoose";




const AdminSchema= new mongoose.Schema({
    imageUrl:{
        type:String
    },
    username:{
        type:String
    },
    email:{
        type:String
    },
    phoneNo:{
        type:Number
    },
    password:{
        type:String
    }
},{timestamps:true})




export default mongoose.model("admin", AdminSchema)

