import mongoose from 'mongoose'



let TeacherSchema= new mongoose.Schema({
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
    },
    cvUrl:{
        type:String
    },
    portfolioUrl:{
        type:String
    },
    certificates:[
        {
            type:String
        }
    ],
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"course"
        }
    ],
    date:{
        type:Date,
        default:Date.now
    }
})







export default mongoose.model("teacher", TeacherSchema)